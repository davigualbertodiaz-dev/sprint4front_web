import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import useCapturas from '../hooks/useCapturas'
import Simulador from '../components/painel/Simulador'
import Estatisticas from '../components/painel/Estatisticas'
import ListaCapturas from '../components/painel/ListaCapturas'

export default function Painel() {
  const { usuario, sair } = useAuth()
  const navigate = useNavigate()
  const { dados } = useFetch('/api/modos.json')
  const { capturas, adicionar, remover, limpar, total, porModo, porcentagemAuto, maisUsado } = useCapturas()

  function aoSair() {
    sair()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-lime uppercase">Área do usuário</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Central de Capturas</h1>
          <p className="mt-2 text-muted">Olá, {usuario.nome}. Teste os modos da LensFlow e veja suas capturas aqui.</p>
        </div>
        <button
          type="button"
          onClick={aoSair}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-white/40"
        >
          <LogOut size={16} aria-hidden="true" /> Sair
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <Simulador modos={dados || []} aoCapturar={adicionar} />
        <Estatisticas total={total} porModo={porModo} porcentagemAuto={porcentagemAuto} maisUsado={maisUsado} />
      </div>

      <ListaCapturas capturas={capturas} aoRemover={remover} aoLimpar={limpar} />
    </div>
  )
}
