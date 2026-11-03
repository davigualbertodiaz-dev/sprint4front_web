import estilosModos, { ordemModos, nomesModos } from '../../data/estilosModos'

// faixa passando com os modos. A lista aparece duas vezes para a volta não "pular"
export default function FaixaModos() {
  const itens = [...ordemModos, ...ordemModos]

  return (
    <div className="overflow-hidden border-y border-zinc-800 bg-zinc-900 py-5" aria-hidden="true">
      <div className="flex w-max animate-faixa gap-4 motion-reduce:animate-none">
        {itens.map((id, indice) => {
          const estilo = estilosModos[id]
          const Icone = estilo.icone
          return (
            <span key={indice} className="flex items-center gap-3 px-4 text-2xl font-bold text-zinc-400 sm:text-3xl">
              <span className={`grid size-10 place-items-center rounded-xl ${estilo.fundo} ${estilo.texto}`}>
                <Icone size={20} />
              </span>
              Modo {nomesModos[id] === 'Auto' ? 'Automático' : nomesModos[id]}
            </span>
          )
        })}
      </div>
    </div>
  )
}
