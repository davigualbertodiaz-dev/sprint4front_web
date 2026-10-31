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
    <section aria-labelledby="titulo-capturas" className="mt-6 rounded-3xl border border-white/[0.07] bg-surface p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <h2 id="titulo-capturas" className="font-display text-xl font-bold">Minhas capturas</h2>

        {capturas.length > 0 && !confirmando && (
          <button type="button" onClick={() => setConfirmando(true)} className="text-sm text-muted hover:text-red-300">
            Limpar tudo
          </button>
        )}
        {confirmando && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted">Excluir as {capturas.length} capturas?</span>
            <button type="button" onClick={confirmarLimpeza} className="rounded-full bg-red-400/15 px-3 py-1 font-medium text-red-300">
              Excluir tudo
            </button>
            <button type="button" onClick={() => setConfirmando(false)} className="text-muted hover:text-paper">
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
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              filtro === id ? 'border-lime bg-lime text-ink' : 'border-white/15 text-muted hover:text-paper'
            }`}
          >
            {id === 'todos' ? 'Todos' : nomesModos[id]}
          </button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-muted">
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
