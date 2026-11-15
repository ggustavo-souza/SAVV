'use server'

import { db, executarComFallback } from "@/lib/db";
import { servicos, usuarios, funcionario } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { MarcadorServico } from "../types/Servico";
import {
    obterSolicitacoesMockadas,
    obterSolicitacaoMockadaPorProtocolo,
    obterMarcadoresMockados,
    obterSolicitacoesMockadasUsuario,
} from "@/lib/mocks/dadosMockados";

export type SolicitacaoListagem = {
    protocolo: number;
    data: Date;
    observacao: string;
    endereco: string;
    lat: number;
    lng: number;
    imagem: string;
    status: "pendente" | "em_analise" | "devolvida" | "concluida" | "cancelada";
    categoria: "poda" | "plantio" | "erradicacao" | "rocagem";
    idUsuario: number | null;
    idFiscal: number | null;
    nomeUsuario: string;
    nomeFiscal: string | null;
};

export async function getTodasSolicitacoes(
    statusFiltro?: "pendente" | "em_analise" | "devolvida" | "concluida" | "cancelada"
): Promise<SolicitacaoListagem[]> {
    return await executarComFallback(
        async () => {
            const query = db
                .select({
                    protocolo: servicos.protocolo,
                    data: servicos.data,
                    observacao: servicos.observacao,
                    endereco: servicos.endereco,
                    lat: servicos.lat,
                    lng: servicos.lng,
                    imagem: servicos.imagem,
                    status: servicos.status,
                    categoria: servicos.categoria,
                    idUsuario: servicos.idUsuario,
                    idFiscal: servicos.idFiscal,
                    nomeUsuario: usuarios.nome,
                    nomeFiscal: funcionario.nome,
                })
                .from(servicos)
                .innerJoin(usuarios, eq(servicos.idUsuario, usuarios.idUsuario))
                .leftJoin(funcionario, eq(servicos.idFiscal, funcionario.idFuncionario))
                .orderBy(desc(servicos.data));

            if (statusFiltro) {
                return await query.where(eq(servicos.status, statusFiltro));
            }

            return await query;
        },
        () => obterSolicitacoesMockadas(statusFiltro)
    );
}

export async function getSolicitacaoPorProtocolo(protocolo: number): Promise<SolicitacaoListagem | null> {
    return await executarComFallback(
        async () => {
            const [solicitacao] = await db
                .select({
                    protocolo: servicos.protocolo,
                    data: servicos.data,
                    observacao: servicos.observacao,
                    endereco: servicos.endereco,
                    lat: servicos.lat,
                    lng: servicos.lng,
                    imagem: servicos.imagem,
                    status: servicos.status,
                    categoria: servicos.categoria,
                    idUsuario: servicos.idUsuario,
                    idFiscal: servicos.idFiscal,
                    nomeUsuario: usuarios.nome,
                    nomeFiscal: funcionario.nome,
                })
                .from(servicos)
                .innerJoin(usuarios, eq(servicos.idUsuario, usuarios.idUsuario))
                .leftJoin(funcionario, eq(servicos.idFiscal, funcionario.idFuncionario))
                .where(eq(servicos.protocolo, protocolo))
                .limit(1);

            return solicitacao ?? null;
        },
        () => obterSolicitacaoMockadaPorProtocolo(protocolo)
    );
}

export async function getSolicitacoes(): Promise<MarcadorServico[]> {
    return await executarComFallback(
        async () => {
            const marcadoresBanco = await db
                .select({
                    protocolo: servicos.protocolo,
                    status: servicos.status,
                    categoria: servicos.categoria,
                    lat: servicos.lat,
                    lng: servicos.lng,
                })
                .from(servicos);

            if (marcadoresBanco.length === 0) {
                return [];
            }

            const marcadores: MarcadorServico[] = marcadoresBanco.map((marcador) => ({
                protocolo: marcador.protocolo,
                status: marcador.status,
                categoria: marcador.categoria,
                coordenadas: {
                    lat: marcador.lat,
                    lng: marcador.lng,
                },
            }));

            return marcadores;
        },
        () => obterMarcadoresMockados()
    );
}

export async function getSolicitacoesUsuario(idUsuario: number, limit = 5, offset = 0) {
    return await executarComFallback(
        async () => {
            const solicitacoes = await db
                .select()
                .from(servicos)
                .where(eq(servicos.idUsuario, idUsuario))
                .limit(limit)
                .offset(offset);

            if (solicitacoes.length === 0) {
                return [];
            }

            return solicitacoes;
        },
        () => obterSolicitacoesMockadasUsuario(idUsuario, limit, offset)
    );
}

export async function getContagemSolicitacoes(): Promise<number> {
    return await executarComFallback(
        async () => {
            const contagemSolicitacoes = await db.$count(servicos);
            return contagemSolicitacoes;
        },
        () => obterSolicitacoesMockadas().length
    );
}

export async function getSolicitacoesEmAndamento(): Promise<SolicitacaoListagem[]> {
    return await executarComFallback(
        async () => {
            const query = db
                .select({
                    protocolo: servicos.protocolo,
                    data: servicos.data,
                    observacao: servicos.observacao,
                    endereco: servicos.endereco,
                    lat: servicos.lat,
                    lng: servicos.lng,
                    imagem: servicos.imagem,
                    status: servicos.status,
                    categoria: servicos.categoria,
                    idUsuario: servicos.idUsuario,
                    idFiscal: servicos.idFiscal,
                    nomeUsuario: usuarios.nome,
                    nomeFiscal: funcionario.nome,
                })
                .from(servicos)
                .innerJoin(usuarios, eq(servicos.idUsuario, usuarios.idUsuario))
                .leftJoin(funcionario, eq(servicos.idFiscal, funcionario.idFuncionario))
                .orderBy(desc(servicos.data));

            return await query.where(eq(servicos.status, "em_analise"));
        },
        () => obterSolicitacoesMockadas("em_analise")
    );
}
