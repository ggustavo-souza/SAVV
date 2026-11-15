import { SolicitacaoListagem } from "@/services/getSolicitacoes";
import { MarcadorServico } from "@/types/Servico";
import { FuncionarioSeguro } from "@/types/Funcionario";

// 10 solicitacoes mockadas para operacao em modo de simulacao sem banco de dados
export const SOLICITACOES_MOCK_INICIAIS: SolicitacaoListagem[] = [
    {
        protocolo: 1,
        data: new Date("2026-02-15T09:30:00Z"),
        observacao: "Poda preventiva de copa densa obstruindo a iluminação pública e fiação elétrica.",
        endereco: "Rua Albertina Nascimento, 120, Vossoroca - Votorantim - SP",
        lat: -23.54520,
        lng: -47.44210,
        imagem: "Sem_imagem.jpg",
        status: "concluida",
        categoria: "poda",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 2,
        data: new Date("2026-03-10T14:15:00Z"),
        observacao: "Árvore de grande porte com raízes danificando a calçada e risco de queda sobre a via.",
        endereco: "Av. 31 de Março, 450, Centro - Votorantim - SP",
        lat: -23.54150,
        lng: -47.44780,
        imagem: "Sem_imagem.jpg",
        status: "em_analise",
        categoria: "erradicacao",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 3,
        data: new Date("2026-04-05T11:00:00Z"),
        observacao: "Solicitação de plantio de espécies nativas (ipê amarelo) na praça do bairro.",
        endereco: "Rua Paula Ney, 210, Rio Acima - Votorantim - SP",
        lat: -23.53890,
        lng: -47.45230,
        imagem: "Sem_imagem.jpg",
        status: "concluida",
        categoria: "plantio",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 4,
        data: new Date("2026-05-18T16:40:00Z"),
        observacao: "Mato alto e vegetação rasteira cobrindo calçada e impedindo passagem de pedestres.",
        endereco: "Rua Monte Alegre, 780, Vila Dominguinho - Votorantim - SP",
        lat: -23.55110,
        lng: -47.43980,
        imagem: "Sem_imagem.jpg",
        status: "em_analise",
        categoria: "rocagem",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 5,
        data: new Date("2026-06-22T08:20:00Z"),
        observacao: "Galhos secos tocando diretamente nos fios de alta tensão em frente ao colégio.",
        endereco: "Av. Gisele Constantino, 1100, Parque Bela Vista - Votorantim - SP",
        lat: -23.55920,
        lng: -47.46450,
        imagem: "Sem_imagem.jpg",
        status: "pendente",
        categoria: "poda",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: null,
        nomeFiscal: null,
    },
    {
        protocolo: 6,
        data: new Date("2026-07-14T10:05:00Z"),
        observacao: "Erradicação de árvore seca e oca após forte vendaval com inclinação perigosa.",
        endereco: "Rua Celso Eugênio da Silveira, 85, Vossoroca - Votorantim - SP",
        lat: -23.54780,
        lng: -47.44520,
        imagem: "Sem_imagem.jpg",
        status: "em_analise",
        categoria: "erradicacao",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 7,
        data: new Date("2026-08-02T13:50:00Z"),
        observacao: "Plantio de árvores para arborização urbana em canteiro central recém-revitalizado.",
        endereco: "Rua João Walter, 305, Centro - Votorantim - SP",
        lat: -23.54310,
        lng: -47.44910,
        imagem: "Sem_imagem.jpg",
        status: "pendente",
        categoria: "plantio",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: null,
        nomeFiscal: null,
    },
    {
        protocolo: 8,
        data: new Date("2026-08-28T15:30:00Z"),
        observacao: "Roçagem urgente em terreno público com acúmulo de animais peçonhentos e mato alto.",
        endereco: "Rua Antônio Rocha Camargo, 420, Rio Acima - Votorantim - SP",
        lat: -23.53650,
        lng: -47.45600,
        imagem: "Sem_imagem.jpg",
        status: "devolvida",
        categoria: "rocagem",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 9,
        data: new Date("2026-09-12T09:10:00Z"),
        observacao: "Poda de formação e remoção de galhos com pragas que ameaçam outras árvores.",
        endereco: "Rua Acácio Miller, 150, Vila Dominguinho - Votorantim - SP",
        lat: -23.55340,
        lng: -47.43720,
        imagem: "Sem_imagem.jpg",
        status: "em_analise",
        categoria: "poda",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
    {
        protocolo: 10,
        data: new Date("2026-10-05T17:00:00Z"),
        observacao: "Solicitação cancelada após vistoria constatar que a espécie está em área particular.",
        endereco: "Rua Ângelo Delapasi, 75, Parque Bela Vista - Votorantim - SP",
        lat: -23.56150,
        lng: -47.46180,
        imagem: "Sem_imagem.jpg",
        status: "cancelada",
        categoria: "erradicacao",
        idUsuario: 1,
        nomeUsuario: "Gustavo Souza",
        idFiscal: 1,
        nomeFiscal: "Eng. Gustavo",
    },
];

// Estado mutavel em memoria para a simulacao durante a execucao
const solicitacoesEmMemoria: SolicitacaoListagem[] = [...SOLICITACOES_MOCK_INICIAIS];

export function obterSolicitacoesMockadas(
    statusFiltro?: "pendente" | "em_analise" | "devolvida" | "concluida" | "cancelada"
): SolicitacaoListagem[] {
    if (statusFiltro) {
        return solicitacoesEmMemoria.filter((s) => s.status === statusFiltro);
    }
    return [...solicitacoesEmMemoria];
}

export function obterSolicitacaoMockadaPorProtocolo(protocolo: number): SolicitacaoListagem | null {
    const encontrada = solicitacoesEmMemoria.find((s) => s.protocolo === protocolo);
    return encontrada ? { ...encontrada } : null;
}

export function obterMarcadoresMockados(): MarcadorServico[] {
    return solicitacoesEmMemoria.map((s) => ({
        protocolo: s.protocolo,
        status: s.status,
        categoria: s.categoria,
        coordenadas: {
            lat: s.lat,
            lng: s.lng,
        },
    }));
}

export function obterSolicitacoesMockadasUsuario(idUsuario: number, limit = 5, offset = 0) {
    const filtradas = solicitacoesEmMemoria.filter(
        (s) => s.idUsuario === idUsuario || s.idUsuario === null
    );
    return filtradas.slice(offset, offset + limit).map((s) => ({
        protocolo: s.protocolo,
        data: s.data,
        observacao: s.observacao,
        endereco: s.endereco,
        lat: s.lat,
        lng: s.lng,
        imagem: s.imagem,
        status: s.status,
        categoria: s.categoria,
        idFiscal: s.idFiscal,
        idUsuario: s.idUsuario ?? 1,
    }));
}

export function adicionarSolicitacaoMockada(nova: {
    observacao: string;
    endereco: string;
    lat: number;
    lng: number;
    imagem: string;
    categoria: "poda" | "plantio" | "erradicacao" | "rocagem";
    idUsuario: number;
}): SolicitacaoListagem {
    const proximoProtocolo = solicitacoesEmMemoria.reduce((max, s) => Math.max(max, s.protocolo), 0) + 1;
    const solicitacaoCriada: SolicitacaoListagem = {
        protocolo: proximoProtocolo,
        data: new Date(),
        observacao: nova.observacao,
        endereco: nova.endereco,
        lat: nova.lat,
        lng: nova.lng,
        imagem: nova.imagem,
        status: "pendente",
        categoria: nova.categoria,
        idUsuario: nova.idUsuario,
        idFiscal: null,
        nomeUsuario: "Munícipe Simulado",
        nomeFiscal: null,
    };
    solicitacoesEmMemoria.unshift(solicitacaoCriada);
    return solicitacaoCriada;
}

export function atualizarStatusSolicitacaoMockada(
    protocolo: number,
    novoStatus: "pendente" | "em_analise" | "devolvida" | "concluida" | "cancelada",
    idFiscal?: number | null
): boolean {
    const index = solicitacoesEmMemoria.findIndex((s) => s.protocolo === protocolo);
    if (index === -1) return false;

    const sol = solicitacoesEmMemoria[index];
    solicitacoesEmMemoria[index] = {
        ...sol,
        status: novoStatus,
        ...(idFiscal !== undefined ? { idFiscal, nomeFiscal: "Eng. Gustavo" } : {}),
    };
    return true;
}

export const FISCAIS_MOCKADOS: FuncionarioSeguro[] = [
    {
        idFuncionario: 1,
        nome: "Eng. Gustavo",
        email: "gustavo@email.com",
        cargo: "fiscal",
    },
    {
        idFuncionario: 2,
        nome: "Fiscal Ana Paula",
        email: "ana.fiscal@votorantim.sp.gov.br",
        cargo: "fiscal",
    },
];

export const FUNCIONARIOS_MOCKADOS: FuncionarioSeguro[] = [
    {
        idFuncionario: 1,
        nome: "Gustavo Souza",
        email: "gustavo.oliveirapr06@gmail.com",
        cargo: "diretor",
    },
    {
        idFuncionario: 2,
        nome: "Eng. Gustavo",
        email: "gustavo@email.com",
        cargo: "fiscal",
    },
    {
        idFuncionario: 3,
        nome: "Gerente Meio Ambiente",
        email: "gerente@votorantim.sp.gov.br",
        cargo: "gerente",
    },
];
