import { Link } from 'react-router-dom'
import { ArrowRight, ScanSearch } from 'lucide-react'
import useCicloDeModos from '../../hooks/useCicloDeModos'
import estilosModos, { ordemModos, nomesModos } from '../../data/estilosModos'

export default function Hero({ modos }) {
  // só os modos que a IA detecta entram no aviso que troca sozinho
  const detectaveis = modos.filter((modo) => modo.deteccao !== null)
  const detectado = useCicloDeModos(detectaveis, 3000)

  const idAtivo = detectado ? detectado.id : 'auto'
  const estilo = estilosModos[idAtivo]
  const Icone = detectado ? estilo.icone : ScanSearch

  return (
    <section
      id="inicio"
      aria-labelledby="titulo-hero"
      className="relative isolate scroll-mt-16 overflow-hidden bg-zinc-950 text-white"
    >

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-24 sm:px-6 md:pt-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-zinc-400">Challenge FIAP x JOVI 2026</p>
          <h1 id="titulo-hero" className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A câmera que <span className="text-violet-400">pensa</span> por você.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            Muita gente usa a câmera do celular só no automático, porque a interface confunde e os modos certos nunca
            aparecem na hora certa. A LensFlow detecta sozinha o que está na cena (documento, pet, pessoa ou paisagem) e
            avisa quando troca de modo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/painel"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold shadow-lg transition hover:bg-violet-500"
            >
              Testar o simulador
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/#modos"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Ver os seis modos
            </Link>
          </div>

          {/* os 6 modos, acendendo o que está "detectado" agora */}
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Modos da câmera">
            {ordemModos.map((id) => {
              const IconeModo = estilosModos[id].icone
              const aceso = id === idAtivo
              return (
                <li
                  key={id}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-500 ${
                    aceso ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400'
                  }`}
                >
                  <IconeModo size={14} aria-hidden="true" />
                  {nomesModos[id]}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative">
          <div className="animate-flutuar rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-md motion-reduce:animate-none">
            <img
              src="/img/auto.png"
              alt="Protótipo da câmera LensFlow: modo Automático detectando uma pessoa e sugerindo o Modo Retrato"
              width="1400"
              height="618"
              className="w-full rounded-xl"
            />
          </div>

          {/* aviso que troca sozinho, simulando a detecção da IA */}
          {detectado && (
            <div
              key={detectado.id}
              className={`absolute -bottom-8 left-4 flex max-w-xs items-start gap-3 rounded-xl border bg-zinc-900 p-3 text-white shadow-xl sm:left-8 ${estilo.borda}`}
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${estilo.fundo} ${estilo.texto}`}>
                <Icone size={18} aria-hidden="true" />
              </span>
              <div>
                <p className={`text-sm font-semibold ${estilo.texto}`}>{detectado.deteccao.titulo}</p>
                <p className="text-xs text-zinc-500">{detectado.deteccao.detalhe}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
