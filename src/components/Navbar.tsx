export default function Navbar() {
  return (
    <header className="w-full shadow-sm border-b h-fit border-gray-200 bg-primaria">
      <nav className="flex w-full justify-between px-10">
        <div className="">
          <a href="/" className="">
            <img src="/SAVV_Logo_SemFundo.png" alt="SAVV Logo" className="h-18 sm:h-22 md:h-24 xl:h-26 w-auto" />
          </a>
        </div>

        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="font-medium lg:text-md xl:text-lg  text-secundaria transition-colors hover:opacity-80">
              Home
            </a>
          </li>
          <li>
            <a href="/servicos" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
              Transparência
            </a>
          </li>
          <li>
            <a href="/denuncie" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
              Serviço
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
