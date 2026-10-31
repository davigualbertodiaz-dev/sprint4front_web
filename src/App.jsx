import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RotaPrivada from './components/RotaPrivada'
import Home from './pages/Home'
import ModoDetalhe from './pages/ModoDetalhe'
import Login from './pages/Login'
import Painel from './pages/Painel'
import NaoEncontrada from './pages/NaoEncontrada'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/modos/:id" element={<ModoDetalhe />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/painel"
          element={
            <RotaPrivada>
              <Painel />
            </RotaPrivada>
          }
        />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}
