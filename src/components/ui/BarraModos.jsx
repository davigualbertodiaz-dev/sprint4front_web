import estilosModos, { ordemModos, nomesModos } from '../../data/estilosModos'

// compacta = só os ícones (usada no visor pequeno da home)
export default function BarraModos({ ativo, aoEscolher, compacta }) {
  return (
    <div
      role="group"
      aria-label="Modos da câmera"
      className="flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-black/60 p-1"
    >
      {ordemModos.map((id) => {
        const Icone = estilosModos[id].icone
        const selecionado = ativo === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selecionado}
            aria-label={compacta ? nomesModos[id] : undefined}
            onClick={() => aoEscolher(id)}
            className={`flex shrink-0 flex-col items-center gap-0.5 rounded-full text-[11px] font-medium text-white transition-colors ${
              compacta ? 'p-2' : 'px-3 py-1.5 sm:px-4'
            } ${selecionado ? 'bg-white/[0.16]' : 'opacity-55 hover:opacity-100'}`}
          >
            <Icone size={compacta ? 16 : 17} aria-hidden="true" />
            {!compacta && nomesModos[id]}
          </button>
        )
      })}
    </div>
  )
}
