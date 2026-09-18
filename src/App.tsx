import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { lazy, Suspense } from "react"
import SpinnerCarregamento from "./components/SpinnerCarregamento";

const Home = lazy(() => import("./pages/Home"));
const SemPagina = lazy(() => import("./pages/SemPagina"));
const Transparencia = lazy(() => import("./pages/Transparencia"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Login = lazy(() => import("./pages/Login"));
const Registrar = lazy(() => import("./pages/Registrar"));

function App() {

  return (
    <Router>
      <Suspense fallback={<div className=""><SpinnerCarregamento /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/servico" element={<Servicos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />

          {/* Aqui em baixo é a rota pra quando o usuário tentar acessar uma página que não existe */}
          <Route path="*" element={<SemPagina />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
