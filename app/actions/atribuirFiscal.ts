'use server'

import { db, executarComFallback } from "@/lib/db";
import { servicos, historico } from "@/lib/db/schema";
import { obterSessao } from "@/services/AuthCheck";
import { atualizarStatusSolicitacaoMockada } from "@/lib/mocks/dadosMockados";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type AtribuirFiscalState = {
    error?: string;
    success?: boolean;
    message?: string;
} | null;

export async function atribuirFiscalAction(
    _prevState: AtribuirFiscalState,
    formData: FormData
): Promise<AtribuirFiscalState> {
    const sessao = await obterSessao();

    if (!sessao || !sessao.userId || sessao.cargo !== 'gerente') {
        return { error: 'Apenas gerentes têm permissão para atribuir fiscais.' };
    }

    const protocoloStr = formData.get('protocolo') as string;
    const idFiscalStr = formData.get('idFiscal') as string;

    const protocolo = parseInt(protocoloStr, 10);
    const idFiscal = parseInt(idFiscalStr, 10);

    if (!protocolo || isNaN(protocolo)) {
        return { error: 'Protocolo de solicitação inválido.' };
    }

    if (!idFiscal || isNaN(idFiscal)) {
        return { error: 'Selecione um fiscal válido.' };
    }

    try {
        await executarComFallback(
            async () => {
                await db.transaction(async (tx) => {
                    await tx
                        .update(servicos)
                        .set({
                            idFiscal: idFiscal,
                            status: 'em_analise',
                        })
                        .where(eq(servicos.protocolo, protocolo));

                    await tx.insert(historico).values({
                        protocolo,
                        idFuncionario: sessao.userId,
                        atualizacao: `Solicitação aprovada para vistoria e atribuída ao fiscal #${idFiscal}. Status alterado para 'em_analise'.`,
                        data: new Date(),
                    });
                });
            },
            () => {
                atualizarStatusSolicitacaoMockada(protocolo, 'em_analise', idFiscal);
                console.info(`🔄 [SAVV] Fiscal #${idFiscal} atribuído à solicitação #${protocolo} (modo simulação).`);
            }
        );

        revalidatePath(`/admin/gerente/solicitacoes/${protocolo}`);
        revalidatePath('/admin/gerente/solicitacoes');
        revalidatePath('/admin/gerente');

        return { success: true, message: 'Fiscal atribuído com sucesso!' };
    } catch (e) {
        console.error('Erro ao atribuir fiscal:', e);
        return { error: 'Ocorreu um erro ao atribuir o fiscal à solicitação.' };
    }
}
