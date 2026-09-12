export default function Navbar() {
  return (
    <header className="w-full shadow-sm border-b border-gray-200 bg-primaria">
      <nav className="flex w-full justify-between px-10">
        <div className="">
          <a href="/" className="">
            <img src="/SAVV_Logo_SemFundo.png" alt="SAVV Logo" className="h-full w-auto" />
          </a>
        </div>

        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="font-medium text-xl text-secundaria transition-colors hover:opacity-80">
              Home
            </a>
          </li>
          <li>
            <a href="/servicos" className="font-medium text-xl text-secundaria transition-colors hover:opacity-80">
              Serviços
            </a>
          </li>
          <li>
            <a href="/denuncie" className="font-medium text-xl text-secundaria transition-colors hover:opacity-80">
              Denuncie
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="font-medium px-6 py-2 text-xl rounded-sm shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
