import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ foto, posicao, total, aoFechar, aoAnterior, aoProxima }) {
  const botaoFechar = useRef(null)

  useEffect(() => {
    botaoFechar.current.focus()
  }, [])

  useEffect(() => {
    function aoApertarTecla(evento) {
      if (evento.key === 'Escape') aoFechar()
      if (evento.key === 'ArrowLeft') aoAnterior()
      if (evento.key === 'ArrowRight') aoProxima()
    }

    window.addEventListener('keydown', aoApertarTecla)
    return () => window.removeEventListener('keydown', aoApertarTecla)
  }, [aoFechar, aoAnterior, aoProxima])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={foto.titulo}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={aoFechar}
    >
      <figure className="w-full max-w-6xl" onClick={(evento) => evento.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <figcaption className="text-sm">
            <span className="font-semibold">{foto.titulo}</span>
            <span className="ml-3 font-mono text-xs text-muted">
              {posicao} / {total}
            </span>
          </figcaption>
          <button
            ref={botaoFechar}
            type="button"
            onClick={aoFechar}
            className="grid size-10 place-items-center rounded-full border border-white/15 hover:bg-white/10"
            aria-label="Fechar foto"
          >
            <X size={20} />
          </button>
        </div>

        <img src={foto.src} alt={foto.alt} className="w-full rounded-2xl border border-white/10" />

        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={aoAnterior}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            <ChevronLeft size={16} aria-hidden="true" /> Anterior
          </button>
          <button
            type="button"
            onClick={aoProxima}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            Próxima <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </figure>
    </div>
  )
}
