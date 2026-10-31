import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import estilosModos from '../data/estilosModos'
import SeloModo from '../components/ui/SeloModo'
import EstadoCarregamento from '../components/ui/EstadoCarregamento'

export default function ModoDetalhe() {
  const { id } = useParams()
  const { dados, carregando, erro } = useFetch('/api/modos.json')

  const modos = dados || []
  const modo = modos.find((item) => item.id === id)

  if (carregando || erro) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6">
        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando o modo…" />
      </div>
    )
  }

  if (!modo) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6">
        <h1 className="font-display text-4xl font-extrabold">Esse modo não existe.</h1>
        <p className="mt-3 text-muted">A LensFlow tem seis modos: Auto, Estudo, Pet, Retrato, Paisagem e Manual.</p>
        <Link to="/#modos" className="mt-6 inline-block rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink">
          Ver os seis modos
        </Link>
      </div>
    )
  }

  const estilo = estilosModos[modo.id]

  return (
    <article className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-10">
      <Link to="/#modos" className="inline-flex items-center gap-2 text-sm text-muted hover:text-paper">
        <ArrowLeft size={16} aria-hidden="true" /> Voltar para os modos
      </Link>

      <header className="mt-8 grid gap-4">
        <SeloModo modo={modo.id} nome={modo.nome} />
        <h1 className={`font-display text-5xl font-extrabold tracking-tight sm:text-7xl ${estilo.texto}`}>
          Modo {modo.nome}
        </h1>
        <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">Ativa quando: {modo.gatilho}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <figure className="overflow-hidden rounded-3xl border border-white/[0.07]">
          <img src={modo.imagem} alt={modo.alt} width="1400" height="620" className="w-full" />
        </figure>
        <div>
          <p className="text-lg leading-relaxed text-paper/85">{modo.descricao}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Recursos do modo">
            {modo.recursos.map((recurso) => (
              <li key={recurso} className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/80">
                {recurso}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section aria-labelledby="titulo-antes-depois" className="mt-14">
        <h2 id="titulo-antes-depois" className="font-display text-3xl font-extrabold tracking-tight">
          Antes e depois
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.07] bg-surface p-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Câmera comum</p>
            <p className="mt-3 leading-relaxed text-muted">{modo.antes}</p>
          </div>
          <div className={`rounded-3xl border p-7 ${estilo.borda} ${estilo.fundo}`}>
            <p className={`font-mono text-[11px] tracking-[0.16em] uppercase ${estilo.texto}`}>Com a LensFlow</p>
            <p className="mt-3 leading-relaxed">{modo.depois}</p>
          </div>
        </div>
      </section>

      <nav aria-label="Outros modos" className="mt-14 border-t border-white/[0.07] pt-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Outros modos</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {modos
            .filter((item) => item.id !== modo.id)
            .map((item) => (
              <li key={item.id}>
                <Link to={`/modos/${item.id}`}>
                  <SeloModo modo={item.id} nome={item.nome} />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </article>
  )
}
