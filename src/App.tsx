import { Route, Routes, BrowserRouter as Router }from "react-router-dom"
import Home from "./pages/Home"
import SemPagina from "./pages/SemPagina"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<SemPagina />} />
        <Route path="/denuncia" element={<SemPagina />} />
        <Route path="/login" element={<SemPagina />} />
        <Route path="/registrar" element={<SemPagina />} />
        
        {/* Aqui em baixo é a rota pra quando o usuário tentar acessar uma página que não existe */}
        <Route path="*" element={<SemPagina />} />
      </Routes>
    </Router>
  )
}

export default App
