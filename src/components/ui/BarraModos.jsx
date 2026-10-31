import estilosModos, { ordemModos, nomesModos } from '../../data/estilosModos'

export default function BarraModos({ ativo, aoEscolher }) {
  return (
    <div
      role="group"
      aria-label="Modos da câmera"
      className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink/70 p-1.5 backdrop-blur"
    >
      {ordemModos.map((id) => {
        const Icone = estilosModos[id].icone
        const selecionado = ativo === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selecionado}
            onClick={() => aoEscolher(id)}
            className={`flex shrink-0 flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors sm:px-4 ${
              selecionado ? 'bg-white/[0.12] text-paper' : 'text-muted hover:text-paper'
            }`}
          >
            <Icone size={17} aria-hidden="true" />
            {nomesModos[id]}
          </button>
        )
      })}
    </div>
  )
}
