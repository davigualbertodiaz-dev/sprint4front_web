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
    <article className="overflow-hidden rounded-xl ring-1 ring-zinc-800">
      {captura.imagem ? (
        <img
          src={captura.imagem}
          alt={
            captura.origemImagem === 'camera'
              ? `Foto capturada no modo ${nomesModos[captura.modo]}`
              : 'Foto de cachorro vinda da API Dog CEO'
          }
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className={`grid aspect-[4/3] place-items-center ${estilo.fundo} ${estilo.texto}`}>
          <Icone size={36} aria-hidden="true" />
        </div>
      )}

      <div className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          <SeloModo modo={captura.modo} nome={nomesModos[captura.modo]} />
          {captura.viaAuto && <span className="text-xs text-zinc-500">via Automático</span>}
        </div>
        {captura.sessao && <p className="mt-2 text-sm font-medium">{captura.sessao}</p>}
        <p className="mt-2 text-xs text-zinc-500">
          ISO {captura.iso} · EV {sinal}
          {captura.exposicao}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <time dateTime={captura.data} className="text-xs text-zinc-500">
            {formatarData(captura.data)}
          </time>
          <button
            type="button"
            onClick={() => aoRemover(captura.id)}
            aria-label={`Excluir captura do modo ${nomesModos[captura.modo]}`}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
