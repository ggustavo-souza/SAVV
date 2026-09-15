import { Route, Routes, BrowserRouter as Router }from "react-router-dom"
import Home from "./pages/Home"
import SemPagina from "./pages/SemPagina"
import Transparencia from "./pages/Transparencia"
import Servicos from "./pages/Servicos"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transparencia" element={<Transparencia />} />
        <Route path="/denuncia" element={<Servicos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        
        {/* Aqui em baixo é a rota pra quando o usuário tentar acessar uma página que não existe */}
        <Route path="*" element={<SemPagina />} />
      </Routes>
    </Router>
  )
}

export default App
