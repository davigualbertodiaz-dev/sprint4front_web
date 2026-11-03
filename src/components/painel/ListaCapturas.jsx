import { useState } from 'react'
import { ordemModos, nomesModos } from '../../data/estilosModos'
import CapturaCard from './CapturaCard'

export default function ListaCapturas({ capturas, aoRemover, aoLimpar }) {
  const [filtro, setFiltro] = useState('todos')
  const [confirmando, setConfirmando] = useState(false)

  const visiveis = filtro === 'todos' ? capturas : capturas.filter((captura) => captura.modo === filtro)

  function confirmarLimpeza() {
    aoLimpar()
    setConfirmando(false)
    setFiltro('todos')
  }

  return (
    <section
      aria-labelledby="titulo-capturas"
      className="mt-6 rounded-2xl bg-zinc-900 p-6 shadow-sm ring-1 ring-zinc-800"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="titulo-capturas" className="text-lg font-semibold">
            Minhas capturas
          </h2>
          <p className="text-sm text-zinc-500">O painel guarda as 30 capturas mais recentes.</p>
        </div>

        {capturas.length > 0 && !confirmando && (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="text-sm font-medium text-zinc-500 hover:text-red-400"
          >
            Limpar tudo
          </button>
        )}
        {confirmando && (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-zinc-400">Excluir as {capturas.length} capturas?</span>
            <button
              type="button"
              onClick={confirmarLimpeza}
              className="rounded-lg bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
            >
              Excluir tudo
            </button>
            <button
              type="button"
              onClick={() => setConfirmando(false)}
              className="font-medium text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div role="group" aria-label="Filtrar capturas por modo" className="mt-5 flex flex-wrap gap-2">
        {['todos', ...ordemModos].map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filtro === id}
            onClick={() => setFiltro(id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              filtro === id ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {id === 'todos' ? 'Todos' : nomesModos[id]}
          </button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <p className="mt-6 rounded-xl border-2 border-dashed border-zinc-800 px-6 py-10 text-center text-sm text-zinc-500">
          {capturas.length === 0
            ? 'Nenhuma captura ainda. Escolha um modo no simulador e toque no botão da câmera.'
            : 'Nenhuma captura neste modo. Escolha outro filtro ou capture algo novo.'}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visiveis.map((captura) => (
            <CapturaCard key={captura.id} captura={captura} aoRemover={aoRemover} />
          ))}
        </div>
      )}
    </section>
  )
}
