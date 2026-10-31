import { Trash2 } from 'lucide-react'
import estilosModos, { nomesModos } from '../../data/estilosModos'
import SeloModo from '../ui/SeloModo'

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export default function CapturaCard({ captura, aoRemover }) {
  const estilo = estilosModos[captura.modo]
  const Icone = estilo.icone
  const sinal = captura.exposicao > 0 ? '+' : ''

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
      {captura.imagem ? (
        <img src={captura.imagem} alt="Foto de cachorro capturada no Modo Pet" className="aspect-[4/3] w-full object-cover" loading="lazy" />
      ) : (
        <div className={`visor-grade grid aspect-[4/3] place-items-center ${estilo.fundo}`}>
          <Icone size={40} className={estilo.texto} aria-hidden="true" />
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <SeloModo modo={captura.modo} nome={nomesModos[captura.modo]} />
          {captura.viaAuto && <span className="text-xs text-muted">via Automático</span>}
        </div>
        {captura.sessao && <p className="mt-3 text-sm font-medium">{captura.sessao}</p>}
        <p className="mt-3 font-mono text-[11px] tracking-wider text-muted">
          ISO {captura.iso} · EV {sinal}{captura.exposicao}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <time dateTime={captura.data} className="text-xs text-muted">{formatarData(captura.data)}</time>
          <button
            type="button"
            onClick={() => aoRemover(captura.id)}
            aria-label={`Excluir captura do modo ${nomesModos[captura.modo]}`}
            className="grid size-8 place-items-center rounded-full text-muted hover:bg-red-400/10 hover:text-red-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
