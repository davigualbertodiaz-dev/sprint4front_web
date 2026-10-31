import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ZoomIn, ZoomOut, Camera, ScanSearch } from 'lucide-react'
import useCicloDeModos from '../../hooks/useCicloDeModos'
import estilosModos, { nomesModos } from '../../data/estilosModos'
import Cantoneiras from '../ui/Cantoneiras'
import BarraModos from '../ui/BarraModos'

export default function Hero({ modos }) {
  const [escolhido, setEscolhido] = useState('auto')

  const detectaveis = modos.filter((modo) => modo.deteccao !== null)
  const detectado = useCicloDeModos(detectaveis, 3200, escolhido === 'auto')

  let modoNaTela = null
  if (escolhido === 'auto') {
    modoNaTela = detectado
  } else {
    modoNaTela = modos.find((modo) => modo.id === escolhido) || null
  }

  let aviso = { titulo: 'Procurando a cena…', detalhe: 'Aponte para um documento, pet, pessoa ou paisagem' }
  if (escolhido === 'auto' && detectado) {
    aviso = detectado.deteccao
  } else if (escolhido === 'manual') {
    aviso = { titulo: 'Modo Manual: você no controle', detalhe: 'Aqui a IA não troca de modo sozinha' }
  } else if (modoNaTela && modoNaTela.deteccao) {
    aviso = { titulo: `Modo ${modoNaTela.nome} ativado`, detalhe: modoNaTela.deteccao.detalhe }
  }

  const idCor = modoNaTela ? modoNaTela.id : 'auto'
  const estilo = estilosModos[idCor]
  const IconeAviso = modoNaTela ? estilo.icone : ScanSearch
  const nomeModoAtivo = escolhido === 'auto' ? 'Automático' : modoNaTela ? modoNaTela.nome : nomesModos[escolhido]

  return (
    <section id="inicio" aria-labelledby="titulo-hero" className="px-3 pt-20 pb-6 sm:px-6 lg:px-10">
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-7xl grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(120%_90%_at_15%_0%,#1b2436_0%,#0e1117_55%,#080a0f_100%)]">
        <div className="visor-grade pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center gap-3 px-3 pt-4 sm:pt-6">
          <BarraModos ativo={escolhido} aoEscolher={setEscolhido} />

          <div
            key={aviso.titulo}
            className={`aviso-animado flex max-w-md items-start gap-3 rounded-2xl border px-4 py-2.5 backdrop-blur ${estilo.fundo} ${estilo.borda}`}
          >
            <IconeAviso size={18} className={`mt-0.5 shrink-0 ${estilo.texto}`} aria-hidden="true" />
            <div>
              <p className={`text-sm font-semibold ${estilo.texto}`}>{aviso.titulo}</p>
              <p className="text-xs text-paper/75">{aviso.detalhe}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-5 py-10 sm:px-10 lg:grid-cols-[2fr_1fr] lg:px-16">
          <div>
            <h1
              id="titulo-hero"
              className="font-display text-[2.4rem] leading-[0.98] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              A câmera que <em className="text-lime">pensa</em>
              <br />
              por você.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
              Muita gente usa a câmera do celular só no automático, porque a interface confunde e os modos certos
              nunca aparecem na hora certa. A LensFlow detecta sozinha o que está na cena — documento, pet, pessoa
              ou paisagem — e avisa quando troca de modo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/painel"
                className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Testar o simulador
              </Link>
              <Link
                to="/#modos"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-white/40"
              >
                Ver os seis modos
              </Link>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div
              className="cantoneiras grid size-48 place-items-end justify-center pb-3"
              style={{ '--cor-foco': estilo.corHex }}
              aria-hidden="true"
            >
              <Cantoneiras />
              <span className="font-mono text-[11px] tracking-widest text-paper/60 uppercase">AF · {nomeModoAtivo}</span>
            </div>
          </div>

          <div
            className="absolute top-1/2 right-4 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-white/10 bg-ink/60 px-2 py-3 text-paper/80 md:flex"
            aria-hidden="true"
          >
            <ZoomIn size={16} />
            <span className="font-mono text-[11px]">1.0x</span>
            <ZoomOut size={16} />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="justify-self-start rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 text-[11px] font-medium text-paper/85">
            Modo {nomeModoAtivo}
          </p>
          <Link
            to="/painel"
            aria-label="Abrir o simulador da câmera no painel"
            className="grid size-16 place-items-center rounded-full border-4 border-paper bg-ink/40 text-paper transition-transform hover:scale-105"
          >
            <Camera size={22} aria-hidden="true" />
          </Link>
          <p className="hidden justify-self-end font-mono text-[11px] tracking-wider text-paper/60 sm:block">
            ISO 200 · 1/120s · f/1.8
          </p>
        </div>
      </div>
    </section>
  )
}
