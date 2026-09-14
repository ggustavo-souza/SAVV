import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="relative h-screen w-full flex flex-col items-center justify-center gap-6 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/foto-de-floresta.jpg')] bg-cover bg-center bg-no-repeat brightness-50 grayscale group-hover:grayscale-0 transition-all duration-1000 z-0" />
                <h1 className="text-6xl text-center font-extrabold text-white z-10 select-none max-w-2xl">Solicite Serviços Ambientais</h1>
                <p className="text-xl text-center font-normal text-primaria z-10 select-none max-w-2xl">Uma plataforma para a solicitação de serviços ambientais. Transparência total para o cidadão.</p>
                <button className="bg-primaria z-10 mt-4 cursor-pointer text-secundaria font-bold py-3 px-10 rounded-sm hover:scale-105 transition-transform duration-300">Solicitar Serviço</button>
            </div>
            
        </>
    )
}