import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'
import EstadoCarregamento from '../ui/EstadoCarregamento'
import estilosModos from '../../data/estilosModos'

// abas: um botão por modo e o conteúdo do modo escolhido embaixo
export default function Modos({ modos, carregando, erro }) {
  const [ativo, setAtivo] = useState('auto')
  const modo = modos.find((item) => item.id === ativo)

  return (
    <section id="modos" aria-labelledby="titulo-modos" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-modos"
          etiqueta="Sistema de câmera"
          titulo="Seis modos."
          destaque="Uma câmera."
          subtitulo="Cada modo foi projetado para uma situação real. A IA detecta o contexto e ajusta tudo automaticamente."
        />

        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando os modos da câmera..." />

        <div role="tablist" aria-label="Modos da câmera" className="flex flex-wrap justify-center gap-2">
          {modos.map((item) => {
            const Icone = estilosModos[item.id].icone
            const selecionado = item.id === ativo
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selecionado}
                onClick={() => setAtivo(item.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selecionado ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                <Icone size={16} aria-hidden="true" />
                {item.nome}
              </button>
            )
          })}
        </div>

        {modo && (
          <div
            key={modo.id}
            role="tabpanel"
            className={`mt-10 grid items-center gap-10 rounded-3xl border p-6 sm:p-10 lg:grid-cols-2 ${estilosModos[modo.id].fundo} ${estilosModos[modo.id].borda}`}
          >
            <div className="rounded-2xl bg-zinc-950 p-2 shadow-md">
              <img src={modo.imagem} alt={modo.alt} width="1400" height="620" className="w-full rounded-xl" />
            </div>
            <div>
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold shadow-sm ${estilosModos[modo.id].texto}`}
              >
                Ativa quando: {modo.gatilho}
              </span>
              <h3 className="mt-4 text-3xl font-bold sm:text-4xl">Modo {modo.nome}</h3>
              <p className="mt-4 leading-relaxed text-zinc-300">{modo.descricao}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2" aria-label={`Recursos do modo ${modo.nome}`}>
                {modo.recursos.map((recurso) => (
                  <li
                    key={recurso}
                    className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 text-sm shadow-sm"
                  >
                    <Check size={16} className={estilosModos[modo.id].texto} aria-hidden="true" />
                    {recurso}
                  </li>
                ))}
              </ul>
              <Link
                to={`/modos/${modo.id}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
              >
                Ver antes e depois
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
