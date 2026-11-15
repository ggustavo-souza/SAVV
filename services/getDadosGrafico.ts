'use server'

import { db, executarComFallback } from "@/lib/db";
import { servicos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { type GraficoBarraProps } from "@/components/GraficoBarra";
import { obterSolicitacoesMockadas } from "@/lib/mocks/dadosMockados";

const NOMES_MESES = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

function calcularDadosGraficoAPartirDeRegistros(
    registros: { data: Date | string | null; status?: string }[],
    semestre?: 1 | 2
): GraficoBarraProps {
    const contagem: number[] = new Array(12).fill(0);

    for (const item of registros) {
        if (item.data) {
            const dataObj = item.data instanceof Date ? item.data : new Date(item.data);
            if (!isNaN(dataObj.getTime())) {
                const mesIdx = dataObj.getMonth();
                if (mesIdx >= 0 && mesIdx < 12) {
                    contagem[mesIdx] += 1;
                }
            }
        }
    }

    const temDadosSemestre1 = contagem.slice(0, 6).some((val) => val > 0);
    const temDadosSemestre2 = contagem.slice(6, 12).some((val) => val > 0);

    let indicesMeses: number[];
    if (semestre === 1) {
        indicesMeses = [0, 1, 2, 3, 4, 5];
    } else if (semestre === 2) {
        indicesMeses = [6, 7, 8, 9, 10, 11];
    } else if (temDadosSemestre1 && temDadosSemestre2) {
        indicesMeses = new Date().getMonth() >= 6 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
    } else if (temDadosSemestre2) {
        indicesMeses = [6, 7, 8, 9, 10, 11];
    } else {
        indicesMeses = [0, 1, 2, 3, 4, 5];
    }

    return indicesMeses.map((idx) => ({
        mes: NOMES_MESES[idx],
        valor: contagem[idx],
        chave: NOMES_MESES[idx],
    }));
}

export async function getDadosGrafico(
    status?: "pendente" | "em_analise" | "concluida" | "cancelada",
    semestre?: 1 | 2
): Promise<GraficoBarraProps> {
    return await executarComFallback(
        async () => {
            const query = db
                .select({
                    data: servicos.data,
                    status: servicos.status,
                })
                .from(servicos);

            const registros = status
                ? await query.where(eq(servicos.status, status))
                : await query;

            return calcularDadosGraficoAPartirDeRegistros(registros, semestre);
        },
        () => {
            const mockadas = obterSolicitacoesMockadas(status);
            return calcularDadosGraficoAPartirDeRegistros(mockadas, semestre);
        }
    );
}

export async function getDadosTransparencia(semestre?: 1 | 2): Promise<GraficoBarraProps> {
    return getDadosGrafico("concluida", semestre);
}

export async function getDadosGerente(semestre?: 1 | 2): Promise<GraficoBarraProps> {
    return getDadosGrafico(undefined, semestre);
}
