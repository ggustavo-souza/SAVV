import { FaExclamation } from "react-icons/fa"

export default function SemPagina() {
    return (
        <>
            <div className="flex flex-col gap-5 items-center justify-center h-screen"> 
                <span className="text-6xl text-secundaria"><FaExclamation /></span>
                <h1 className="text-3xl font-bold">404</h1>
                <p className="text-xl text-center">Esta página não existe, ou está fora do ar.</p>
            </div>
        </>
    )
}