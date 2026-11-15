'use server'

import { db, executarComFallback } from "@/lib/db";
import { servicos } from "@/lib/db/schema";
import { obterSolicitacoesMockadas } from "@/lib/mocks/dadosMockados";

export type BairroSolicitacao = {
    bairro: string;
    total: number;
    porcentagem: number;
};

function formatarNomeBairro(nome: string): string {
    const palavras = nome.trim().toLowerCase().split(/\s+/);
    const preposicoes = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

    return palavras
        .map((palavra, index) => {
            if (index > 0 && preposicoes.has(palavra)) {
                return palavra;
            }
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(' ');
}

export async function extrairBairroDeEndereco(endereco: string): Promise<string> {
    if (!endereco || typeof endereco !== 'string') {
        return 'Não informado';
    }

    const enderecoLimpo = endereco.trim();
    if (!enderecoLimpo) return 'Não informado';

    // Remove referências a CEP no final do endereço (ex: " - CEP: 18110-000")
    const semCep = enderecoLimpo
        .replace(/\s*-\s*CEP:?.*$/i, '')
        .replace(/,\s*CEP:?.*$/i, '')
        .replace(/\s+CEP:\s*.*$/i, '')
        .trim();

    // No padrão "Rua, Bairro" ou "Rua, Número, Bairro", o bairro é a última parte após a vírgula
    if (semCep.includes(',')) {
        const partes = semCep.split(',');
        const possivelBairro = partes[partes.length - 1].trim();
        if (possivelBairro) {
            return formatarNomeBairro(possivelBairro);
        }
    }

    // Se estiver separado por hífen ("Rua - Bairro")
    if (semCep.includes('-')) {
        const partes = semCep.split('-');
        const possivelBairro = partes[partes.length - 1].trim();
        if (possivelBairro) {
            return formatarNomeBairro(possivelBairro);
        }
    }

    return formatarNomeBairro(semCep);
}

async function processarBairrosDeEnderecos(
    registros: { endereco: string | null }[],
    limite = 3
): Promise<BairroSolicitacao[]> {
    if (!registros || registros.length === 0) {
        return [];
    }

    const contagemPorBairro: Record<string, number> = {};
    let totalValidos = 0;

    for (const item of registros) {
        if (!item.endereco) continue;
        const bairro = await extrairBairroDeEndereco(item.endereco);
        if (!bairro) continue;

        contagemPorBairro[bairro] = (contagemPorBairro[bairro] || 0) + 1;
        totalValidos++;
    }

    const ordenados = Object.entries(contagemPorBairro)
        .map(([bairro, total]) => ({
            bairro,
            total,
            porcentagem: totalValidos > 0 ? Math.round((total / totalValidos) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total || a.bairro.localeCompare(b.bairro));

    return ordenados.slice(0, limite);
}

export async function getBairrosComMaisSolicitacoes(limite: number = 3): Promise<BairroSolicitacao[]> {
    return await executarComFallback(
        async () => {
            const registros = await db
                .select({
                    endereco: servicos.endereco,
                })
                .from(servicos);

            return await processarBairrosDeEnderecos(registros, limite);
        },
        async () => {
            const mockadas = obterSolicitacoesMockadas();
            return await processarBairrosDeEnderecos(mockadas, limite);
        }
    );
}
