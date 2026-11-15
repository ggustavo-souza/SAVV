'use server'

import { db, executarComFallback } from "@/lib/db"
import { eq } from "drizzle-orm"
import { usuarios, funcionario } from "@/lib/db/schema"
import { verificarSenha, criarCookieSessao } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export type LoginState = {
    error?: string
    success?: boolean
} | null

export async function loginAction(tipo: 'usuario' | 'funcionario', _prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string
    const senha = formData.get('senha') as string

    if (!email || !senha) {
        return { error: 'Preencha todos os campos.' };
    }

    if (tipo === 'funcionario') {
        const func = await executarComFallback(
            async () => {
                const [registro] = await db.select().from(funcionario).where(eq(funcionario.email, email)).limit(1)
                return registro ?? null
            },
            () => {
                // Modo simulado para funcionarios cadastrados no seed
                if (email === 'gustavo.oliveirapr06@gmail.com') {
                    return {
                        idFuncionario: 1,
                        nome: "GustavoSouza",
                        email,
                        senha: "",
                        cargo: "diretor" as const,
                        dataCadastro: new Date(),
                    };
                }
                if (email === 'gustavo@email.com') {
                    return {
                        idFuncionario: 2,
                        nome: "Eng. Gustavo",
                        email,
                        senha: "",
                        cargo: "fiscal" as const,
                        dataCadastro: new Date(),
                    };
                }
                if (email.includes('gerente')) {
                    return {
                        idFuncionario: 3,
                        nome: "Gerente Meio Ambiente",
                        email,
                        senha: "",
                        cargo: "gerente" as const,
                        dataCadastro: new Date(),
                    };
                }
                // Fallback padrao como gerente se nenhum coincidir
                return {
                    idFuncionario: 3,
                    nome: "Gerente Simulado",
                    email,
                    senha: "",
                    cargo: "gerente" as const,
                    dataCadastro: new Date(),
                };
            }
        )

        if (!func) {
            return { error: "Credenciais Inválidas" }
        }

        if (func.senha) {
            const validarSenha = await verificarSenha(senha, func.senha)
            if (!validarSenha) {
                return { error: "A senha digitada está incorreta" }
            }
        }

        await criarCookieSessao(func.idFuncionario, func.cargo)
        if (func.cargo === 'diretor') {
            redirect("/admin/diretor")
        } else if (func.cargo === 'fiscal') {
            redirect("/admin/fiscal")
        } else {
            redirect("/admin/gerente")
        }
    }

    // Fluxo padrão: tabela usuarios
    const usuario = await executarComFallback(
        async () => {
            const [registro] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1)
            return registro ?? null
        },
        () => {
            // Modo simulado para usuario padrao
            return {
                idUsuario: 1,
                nome: "Gustavo Souza",
                email,
                senha: "",
                foto: "Sem_imagem.jpg",
            };
        }
    )

    if (!usuario) {
        return { error: "Credenciais Inválidas" }
    }

    if (usuario.senha) {
        const validarSenha = await verificarSenha(senha, usuario.senha)
        if (!validarSenha) {
            return { error: "A senha digitada está incorreta" }
        }
    }

    await criarCookieSessao(usuario.idUsuario, null)
    redirect("/")
}
