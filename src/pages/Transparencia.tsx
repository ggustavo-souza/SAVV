import GraficoBarra from "../components/GraficoBarra";
import Navbar from "../components/Navbar";

export default function Transparencia() {
   
    const dadosGrafico = [
        { chave: 'Jan', valor: 300 },
        { chave: 'Fev', valor: 450 },
        { chave: 'Mar', valor: 600 },
        { chave: 'Abr', valor: 200 },
        { chave: 'Mai', valor: 700 },
        { chave: 'Jun', valor: 400 },
    ];

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
                        <GraficoBarra dadosGrafico={dadosGrafico} />
                    </div>
                </div>
            </section>
        </>
    );
}