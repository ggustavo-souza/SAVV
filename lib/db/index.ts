// arquivo de conexao com o banco com suporte a modo offline / simulacao

import { drizzle } from 'drizzle-orm/mysql2';
import mysql, { Pool } from 'mysql2/promise';
import * as schema from './schema';

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/database_savv';

let poolConnection: Pool | null = null;

try {
    poolConnection = mysql.createPool({
        uri: DATABASE_URL,
        connectTimeout: 2000,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
} catch (error) {
    console.warn('⚠️ [SAVV] Falha ao inicializar o pool de conexões com o banco de dados:', error);
}

export const db = drizzle(poolConnection as Pool, { schema, mode: 'default' });

let bancoDisponivel: boolean | null = null;
let ultimaVerificacao = 0;
const INTERVALO_CACHE_VERIFICACAO = 15000; // 15 segundos

export function isErroConexaoBanco(error: unknown): boolean {
    if (!error) return false;

    const errAny = error as Record<string, unknown>;
    const causa = (errAny.cause && typeof errAny.cause === 'object')
        ? (errAny.cause as Record<string, unknown>)
        : undefined;

    const codigosErroConexao = new Set([
        'ECONNREFUSED',
        'ETIMEDOUT',
        'ENOTFOUND',
        'EHOSTUNREACH',
        'PROTOCOL_CONNECTION_LOST',
        'ER_ACCESS_DENIED_ERROR',
        'ER_BAD_DB_ERROR',
        'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR',
        'ER_CON_COUNT_ERROR',
        'EAI_AGAIN',
    ]);

    const code = String(errAny.code || causa?.code || '');
    if (codigosErroConexao.has(code)) {
        return true;
    }

    const textoCompleto = [
        String(errAny.message || ''),
        String(causa?.message || ''),
        String(errAny.sqlMessage || ''),
        String(causa?.sqlMessage || ''),
        String(error),
    ].join(' ').toLowerCase();

    return (
        textoCompleto.includes('econnrefused') ||
        textoCompleto.includes('etimedout') ||
        textoCompleto.includes('enotfound') ||
        textoCompleto.includes('ehostunreach') ||
        textoCompleto.includes('connection lost') ||
        textoCompleto.includes('access denied') ||
        textoCompleto.includes('connect econnrefused') ||
        textoCompleto.includes("can't connect") ||
        textoCompleto.includes('drizzlequeryerror')
    );
}

// Testa a conexao com o banco e memoriza temporariamente para nao travar a aplicacao
export async function testarConexaoBanco(): Promise<boolean> {
    const agora = Date.now();
    if (bancoDisponivel !== null && agora - ultimaVerificacao < INTERVALO_CACHE_VERIFICACAO) {
        return bancoDisponivel;
    }

    if (!poolConnection) {
        bancoDisponivel = false;
        ultimaVerificacao = agora;
        return false;
    }

    try {
        const conexao = await Promise.race([
            poolConnection.getConnection(),
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('ETIMEDOUT')), 2000)
            ),
        ]);

        await conexao.ping();
        conexao.release();

        bancoDisponivel = true;
        ultimaVerificacao = agora;
        return true;
    } catch (error) {
        bancoDisponivel = false;
        ultimaVerificacao = agora;

        const detalhes = error instanceof Error ? error.message : String(error);
        console.warn('⚠️ [SAVV] Sem conexão com o banco de dados:', detalhes);
        console.info('🔄 [SAVV] Operando em modo de simulação com dados mockados (10 solicitações).');
        return false;
    }
}

// Executa uma operacao no banco e, caso nao consiga conectar, recorre ao fallback mockado
export async function executarComFallback<T>(
    operacaoBanco: () => Promise<T>,
    fallbackMock: () => T | Promise<T>
): Promise<T> {
    const agora = Date.now();
    // Se ja sabemos que o banco esta fora nos ultimos segundos, pula direto para o mock
    if (bancoDisponivel === false && agora - ultimaVerificacao < INTERVALO_CACHE_VERIFICACAO) {
        return await fallbackMock();
    }

    try {
        const resultado = await operacaoBanco();
        bancoDisponivel = true;
        ultimaVerificacao = agora;
        return resultado;
    } catch (error) {
        if (isErroConexaoBanco(error)) {
            bancoDisponivel = false;
            ultimaVerificacao = agora;
            const detalhes = error instanceof Error ? error.message : String(error);
            console.warn('⚠️ [SAVV] Falha de conexão ao executar consulta no banco:', detalhes);
            console.info('🔄 [SAVV] Alternando para dados mockados em modo de simulação.');
            return await fallbackMock();
        }
        // Se for outro erro de validacao/query, propaga
        throw error;
    }
}
