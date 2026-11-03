import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import estilosModos from '../data/estilosModos'
import EstadoCarregamento from '../components/ui/EstadoCarregamento'
import SeloModo from '../components/ui/SeloModo'

export default function ModoDetalhe() {
  const { id } = useParams()
  const { dados, carregando, erro } = useFetch('/api/modos.json')

  const modos = dados || []
  const modo = modos.find((item) => item.id === id)

  if (carregando || erro) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando o modo..." />
      </div>
    )
  }

  if (!modo) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Esse modo não existe.</h1>
        <p className="mt-3 text-zinc-400">A LensFlow tem seis modos: Auto, Estudo, Pet, Retrato, Paisagem e Manual.</p>
        <Link
          to="/#modos"
          className="mt-8 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Ver os seis modos
        </Link>
      </div>
    )
  }

  const estilo = estilosModos[modo.id]
  const Icone = estilo.icone

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/#modos" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" /> Voltar para os modos
      </Link>

      <header className="mt-8 flex flex-wrap items-center gap-4">
        <span className={`grid size-14 place-items-center rounded-2xl ${estilo.fundo} ${estilo.texto}`}>
          <Icone size={28} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Modo {modo.nome}</h1>
          <p className="mt-1 text-zinc-400">Ativa quando: {modo.gatilho}</p>
        </div>
      </header>

      <img
        src={modo.imagem}
        alt={modo.alt}
        width="1400"
        height="620"
        className="mt-8 w-full rounded-2xl shadow-lg ring-1 ring-white/10"
      />

      <p className="mt-8 text-lg leading-relaxed text-zinc-300">{modo.descricao}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Recursos do modo">
        {modo.recursos.map((recurso) => (
          <li key={recurso} className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
            {recurso}
          </li>
        ))}
      </ul>

      <section aria-labelledby="titulo-antes-depois" className="mt-12">
        <h2 id="titulo-antes-depois" className="text-2xl font-bold">
          Antes e depois
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-zinc-800 p-6">
            <p className="text-sm font-semibold text-zinc-500">Câmera comum</p>
            <p className="mt-2 text-zinc-300">{modo.antes}</p>
          </div>
          <div className={`rounded-2xl border p-6 ${estilo.fundo} ${estilo.borda}`}>
            <p className={`text-sm font-semibold ${estilo.texto}`}>Com a LensFlow</p>
            <p className="mt-2 text-zinc-200">{modo.depois}</p>
          </div>
        </div>
      </section>

      <nav aria-label="Outros modos" className="mt-12 border-t border-zinc-800 pt-8">
        <p className="text-sm font-medium text-zinc-500">Outros modos</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {modos
            .filter((item) => item.id !== modo.id)
            .map((item) => (
              <li key={item.id}>
                <Link to={`/modos/${item.id}`} className="transition-opacity hover:opacity-75">
                  <SeloModo modo={item.id} nome={item.nome} />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </article>
  )
}
