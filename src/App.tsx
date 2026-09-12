import { Route, Routes, BrowserRouter as Router }from "react-router-dom"
import Home from "./pages/Home"
import SemPagina from "./pages/SemPagina"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<SemPagina />} />
      </Routes>
    </Router>
  )
}

export default App
