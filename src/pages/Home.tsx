import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="relative h-screen w-full flex flex-col items-center justify-center gap-6 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/foto-de-floresta.jpg')] bg-cover bg-center bg-no-repeat brightness-50 grayscale group-hover:grayscale-0 transition-all duration-1000 z-0" />
                <h1 className="text-6xl text-center font-extrabold text-white z-10 select-none max-w-2xl">Solicite Serviços Ambientais</h1>
                <p className="text-xl text-center font-normal text-primaria z-10 select-none max-w-2xl">Uma plataforma para a solicitação de serviços ambientais. Transparência total para o cidadão.</p>
                <button className="bg-primaria z-10 mt-4 cursor-pointer text-secundaria font-bold py-3 px-10 rounded-xs hover:scale-105 hover:brightness-90 transition-transform duration-200">Solicitar Serviço</button>
            </div>
            <section className="w-full h-fit bg-primaria flex flex-row items-center justify-center gap-6 py-20">
                <div className="w-full h-fit flex flex-col items-start justify-center gap-2 px-10">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Total de Serviços Solicitados</p>
                    <h1 className="text-7xl mt-2 font-extrabold text-center text-secundaria">87</h1>
                </div>

                <div className="w-full h-fit flex flex-col items-start justify-center gap-2 px-10">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Total de Serviços Solicitados</p>
                    <h1 className="text-7xl mt-2 font-extrabold text-center text-secundaria">87</h1>
                </div>

                <div className="w-full h-fit flex flex-col items-start justify-center gap-2 px-10">
                    <p className="text-xl z-10 font-bold text-center text-gray-500">Total de Serviços Solicitados</p>
                    <h1 className="text-7xl mt-2 font-extrabold text-center text-secundaria">87</h1>
                </div>
            </section>
        </>
    )
}