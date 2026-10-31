import { useState } from 'react'
import { Camera, ScanSearch, LoaderCircle } from 'lucide-react'
import estilosModos, { nomesModos } from '../../data/estilosModos'
import BarraModos from '../ui/BarraModos'
import Cantoneiras from '../ui/Cantoneiras'
import useSimuladorCamera from '../../hooks/useSimuladorCamera'

export default function Simulador({ modos, aoCapturar }) {
  const { modo, trocarModo, aviso, processando, erro, capturar } = useSimuladorCamera(modos, aoCapturar)
  const [nomeSessao, setNomeSessao] = useState('')

  const estilo = aviso ? estilosModos[aviso.modo] : estilosModos[modo]

  function aoClicarCapturar() {
    capturar(nomeSessao)
  }

  return (
    <section aria-labelledby="titulo-simulador" className="rounded-3xl border border-white/[0.07] bg-surface p-4 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-4 px-1">
        <h2 id="titulo-simulador" className="font-display text-xl font-bold">Simulador</h2>
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Modo {nomesModos[modo]}</p>
      </div>

      <div className="relative grid min-h-80 grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_90%_at_15%_0%,#1b2436_0%,#0e1117_60%,#080a0f_100%)] sm:min-h-96">
        <div className="visor-grade pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center gap-3 px-2 pt-3">
          <BarraModos ativo={modo} aoEscolher={trocarModo} />

          <div role="status" className="min-h-14">
            {aviso && (
              <div key={aviso.titulo} className={`aviso-animado flex items-start gap-2 rounded-2xl border px-4 py-2 backdrop-blur ${estilo.fundo} ${estilo.borda}`}>
                <ScanSearch size={16} className={`mt-0.5 shrink-0 ${estilo.texto}`} aria-hidden="true" />
                <div>
                  <p className={`text-sm font-semibold ${estilo.texto}`}>{aviso.titulo}</p>
                  <p className="text-xs text-paper/75">{aviso.detalhe}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 grid place-items-center">
          <div className="cantoneiras size-28" style={{ '--cor-foco': estilo.corHex }} aria-hidden="true">
            <Cantoneiras />
          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-4">
          <button
            type="button"
            onClick={aoClicarCapturar}
            disabled={processando}
            aria-label={processando ? 'Capturando…' : `Capturar no modo ${nomesModos[modo]}`}
            className="grid size-16 place-items-center rounded-full border-4 border-paper bg-ink/40 text-paper transition-transform hover:scale-105 disabled:opacity-60"
          >
            {processando ? <LoaderCircle size={22} className="animate-spin" /> : <Camera size={22} />}
          </button>
        </div>
      </div>

      {modo === 'estudo' && (
        <div className="mt-4">
          <label htmlFor="sessao" className="text-sm font-medium">Nome da sessão de estudo</label>
          <input
            id="sessao"
            type="text"
            value={nomeSessao}
            onChange={(evento) => setNomeSessao(evento.target.value)}
            placeholder="Ex: Matemática Cap. 5"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-paper placeholder:text-muted/70 focus:border-lime focus:outline-none"
          />
        </div>
      )}

      <p className="mt-4 px-1 text-sm leading-relaxed text-muted">
        {modo === 'auto'
          ? 'No Automático, a "IA" sorteia o que está na cena e troca de modo sozinha. Toque no botão para capturar.'
          : modo === 'pet'
            ? 'No Modo Pet, a foto do pet vem de uma API pública (Dog CEO).'
            : 'Toque no botão para capturar neste modo.'}
      </p>

      {erro && (
        <p role="alert" className="mt-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {erro}
        </p>
      )}
    </section>
  )
}
