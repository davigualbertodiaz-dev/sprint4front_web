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
    <div className="bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <header className="relative isolate flex flex-wrap items-end justify-between gap-4 overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 p-8 text-white">
          <div>
            <p className="text-sm font-semibold text-violet-300">Área do usuário</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Central de Capturas</h1>
            <p className="mt-2 text-zinc-400">
              Olá, {usuario.nome}. Teste os modos da LensFlow e veja suas capturas aqui.
            </p>
          </div>
          <button
            type="button"
            onClick={aoSair}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            <LogOut size={16} aria-hidden="true" /> Sair
          </button>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <Simulador modos={dados || []} aoCapturar={adicionar} />
          </div>
          <Estatisticas total={total} porModo={porModo} porcentagemAuto={porcentagemAuto} maisUsado={maisUsado} />
        </div>

        <ListaCapturas capturas={capturas} aoRemover={remover} aoLimpar={limpar} />
      </div>
    </div>
  )
}
