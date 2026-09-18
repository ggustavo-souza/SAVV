import Navbar from "../components/Navbar";
// importa só o que a gente vai usar na criação do gráfico
import {
    Chart as ChartJS, //representa o gráfico em si
    CategoryScale, // representa o eixo X marcado pelas categorias
    LinearScale, // representa o eixo Y marcado pelos valores
    BarElement, // representa a própria barra do gráfico
    Tooltip, // representa o balaozinho de dicas quando vc passa o mouse em cima
    type ChartOptions // arquivo de tipagem do gráfico, para orientar as options    
} from 'chart.js';

import { Bar } from 'react-chartjs-2'; //representa o componente da barra que vai ser renderizado

import ChartDataLabels from 'chartjs-plugin-datalabels'; // representa o plugin que vai colocar os números em cima das barras

// aqui a gente avisa pra biblioteca todos os elementos que serao usados no gráfico
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartDataLabels
);

export default function Transparencia() {
    // dados pra simulação 
    const dadosApi = [
        { mes: 'Jan', valor: 300 },
        { mes: 'Fev', valor: 450 },
        { mes: 'Mar', valor: 600 },
        { mes: 'Abr', valor: 200 },
        { mes: 'Mai', valor: 700 },
        { mes: 'Jun', valor: 400 },
    ];

    // essa variável guarda toda a configuração do gráfico
    const options: ChartOptions<'bar'> = {
        // fala pra ele ser responsivo
        responsive: true,
        // desativa a manutenção da proporção do gráfico, pra ele se adaptar melhor ao container
        maintainAspectRatio: false,
        // atribui a configuração do layout, escalas e plugins
        layout: {
            padding: { top: 30 } // Espaço para os números não cortarem
        },
        // configura os eixos do gráfico
        scales: {
            x: {
                grid: { display: false }, // Remove as linhas verticais
                ticks: { font: { size: 14, family: 'Poppins' } }, // Fonte do eixo X
                border: { display: true }, // Remove a linha da base
            },
            y: {
                display: false, // Esconde o eixo Y inteiro para bater com o layout
            },
        },
        plugins: {
            legend: { display: false, }, // Sem legenda padrão
            tooltip: { enabled: true }, // habilita o balaozinho
            datalabels: {
                anchor: 'end', // fala pros números ficarem em cima da barra
                align: 'top', // fala pros números ficarem em cima da barra
                font: { weight: 'bold', size: 12, family: 'Poppins' }, // fonte do número
                // Lógica para colorir o texto do label em destaque
                color: (context: any) => {
                    const valor = context.dataset.data[context.dataIndex];
                    const maiorValor = Math.max(...context.dataset.data);

                    return valor === maiorValor ? '#054100' : '#4b5563'; // Verde escuro para o destaque, cinza para os outros
                },
            },
        },
    };

    // Os dados dinâmicos recebidos via props (da API)
    const data = {
        labels: dadosApi.map(item => item.mes), // pega os meses do array de dados

        datasets: [
            {
                data: dadosApi.map(item => item.valor), // pega os valores do array de dados
                // Lógica para colorir a barra que tem o maior valor (ou valor específico)
                backgroundColor: dadosApi.map(item =>
                    item.valor === Math.max(...dadosApi.map(i => i.valor)) ? '#054100' : '#e5e7eb' // Verde escuro vs Cinza claro
                ),
                barThickness: 15, // Deixa a barra mais fina, como no protótipo
                borderRadius: 0,
            },
        ],
    };
    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex flex-row my-20 justify-between gap-6">
                <article className="flex flex-col w-1/2 text-start ms-12 gap-3">
                    <p className="font-bold text-secundaria">NOSSA ATUAÇÃO</p>
                    <h1 className="text-5xl font-bold text-black">Transparência de Dados</h1>
                    <p className="text-md font-light text-secundaria">Zelamos pela transparência e integridade dos nossos dados em todas as nossas operações.</p>
                </article>
                <aside className="w-1/2 h-3/4 border bg-gray-200 flex items-center justify-center me-10">
                    <p>div do mapa</p>
                </aside>
            </div>
            <section className="my-10">
                {/* {Div dos gráficos} */}
                <div className="w-full h-fit flex flex-row items-center justify-center gap-6 mt-10">
                    <h1 className="text-4xl w-fit font-bold text-black mb-4 border-b-3">GRÁFICOS E DADOS</h1>
                </div>
                <div className="h-full flex flex-row ms-10 gap-6 mt-10">
                    <div className="w-1/2 h-96 flex items-center justify-center shadow-lg py-4">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </section>
        </>
    );
}