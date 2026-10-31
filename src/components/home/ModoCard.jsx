import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import estilosModos from '../../data/estilosModos'
import SeloModo from '../ui/SeloModo'

export default function ModoCard({ modo, invertido }) {
  const estilo = estilosModos[modo.id]

  return (
    <article className="grid items-center gap-6 rounded-3xl border border-white/[0.07] bg-surface p-4 sm:p-6 md:grid-cols-2 md:gap-10 lg:p-8">
      <figure className={`relative overflow-hidden rounded-2xl border border-white/[0.07] ${invertido ? 'md:order-last' : ''}`}>
        <img src={modo.imagem} alt={modo.alt} width="1400" height="620" className="w-full" loading="lazy" />
        <figcaption className="absolute top-3 left-3">
          <SeloModo modo={modo.id} nome={modo.nome} />
        </figcaption>
      </figure>

      <div className="px-2 pb-2 md:px-0 md:pb-0">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Ativa quando</p>
        <p className="mt-1 text-sm text-paper/85">{modo.gatilho}</p>

        <h3 className={`mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${estilo.texto}`}>
          {modo.nome}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{modo.descricao}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Recursos do modo ${modo.nome}`}>
          {modo.recursos.map((recurso) => (
            <li key={recurso} className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/80">
              {recurso}
            </li>
          ))}
        </ul>

        <Link
          to={`/modos/${modo.id}`}
          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${estilo.texto} hover:underline`}
        >
          Ver antes e depois do modo {modo.nome}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
