import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// janela que abre a foto grande. Teclado: Esc fecha, setas trocam de foto.
export default function Lightbox({ foto, posicao, total, aoFechar, aoAnterior, aoProxima }) {
  const botaoFechar = useRef(null)

  // leva o foco para o botão de fechar só quando a janela abre
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

  const classeBotao =
    'inline-flex items-center gap-1 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={foto.titulo}
      className="fixed inset-0 z-[100] grid place-items-center bg-zinc-900/90 p-4"
      onClick={aoFechar}
    >
      {/* stopPropagation: clicar na foto não fecha a janela */}
      <figure className="w-full max-w-5xl" onClick={(evento) => evento.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between text-white">
          <figcaption className="font-medium">
            {foto.titulo}{' '}
            <span className="ml-2 text-sm text-zinc-400">
              {posicao} / {total}
            </span>
          </figcaption>
          <button
            ref={botaoFechar}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar foto"
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>
        <img src={foto.src} alt={foto.alt} className="w-full rounded-xl" />
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={aoAnterior} className={classeBotao}>
            <ChevronLeft size={16} aria-hidden="true" /> Anterior
          </button>
          <button type="button" onClick={aoProxima} className={classeBotao}>
            Próxima <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </figure>
    </div>
  )
}
