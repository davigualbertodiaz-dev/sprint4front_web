import { useState } from 'react'
import { Camera, ScanSearch, LoaderCircle, Video, VideoOff, SwitchCamera } from 'lucide-react'
import estilosModos, { nomesModos } from '../../data/estilosModos'
import BarraModos from '../ui/BarraModos'
import Cantoneiras from '../ui/Cantoneiras'
import useSimuladorCamera from '../../hooks/useSimuladorCamera'
import useCameraReal from '../../hooks/useCameraReal'

export default function Simulador({ modos, aoCapturar }) {
  const { modo, trocarModo, aviso, processando, erro, capturar } = useSimuladorCamera(modos, aoCapturar)
  const { videoRef, ligada, erro: erroCamera, lado, podeVirar, ligar, desligar, virar, tirarFoto } = useCameraReal()
  const [nomeSessao, setNomeSessao] = useState('')
  const [flash, setFlash] = useState(false)

  const estilo = aviso ? estilosModos[aviso.modo] : estilosModos[modo]

  function aoClicarCapturar() {
    const foto = tirarFoto()
    if (foto) {
      setFlash(true)
      setTimeout(() => setFlash(false), 150)
    }
    capturar(nomeSessao, foto)
  }

  let dica = 'Toque no botão para capturar neste modo.'
  if (!ligada) {
    dica = 'Ligue a câmera para salvar fotos de verdade. Com ela desligada, o simulador salva só os dados da captura.'
  }
  if (modo === 'auto') {
    dica += ' No Automático, o simulador sorteia a cena detectada e troca de modo sozinho.'
  }
  if (modo === 'pet' && !ligada) {
    dica = 'Com a câmera desligada, a foto do pet vem de uma API pública (Dog CEO).'
  }

  return (
    <section aria-labelledby="titulo-simulador" className="rounded-3xl border border-white/[0.07] bg-surface p-4 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-4 px-1">
        <h2 id="titulo-simulador" className="font-display text-xl font-bold">Simulador</h2>
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Modo {nomesModos[modo]}</p>
      </div>

      <div className="relative grid min-h-80 grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_90%_at_15%_0%,#1b2436_0%,#0e1117_60%,#080a0f_100%)] sm:min-h-96">
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full object-cover ${ligada ? '' : 'hidden'} ${lado === 'user' ? '-scale-x-100' : ''}`}
          playsInline
          muted
          autoPlay
          aria-label="Imagem ao vivo da câmera"
        />
        <div className="visor-grade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className={`pointer-events-none absolute inset-0 z-20 bg-white transition-opacity duration-150 motion-reduce:hidden ${flash ? 'opacity-60' : 'opacity-0'}`}
          aria-hidden="true"
        />

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
          {ligada && (
            <p className="absolute top-0 left-3 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[11px] tracking-widest text-paper backdrop-blur">
              <span className="ponto-rec size-2 rounded-full bg-red-500" aria-hidden="true" />
              AO VIVO · {lado === 'user' ? 'FRONTAL' : 'TRASEIRA'}
            </p>
          )}
          <div className="cantoneiras size-28" style={{ '--cor-foco': estilo.corHex }} aria-hidden="true">
            <Cantoneiras />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 pb-4">
          <button
            type="button"
            onClick={ligada ? desligar : ligar}
            aria-pressed={ligada}
            className="inline-flex items-center gap-2 justify-self-start whitespace-nowrap rounded-full border border-white/15 bg-ink/70 px-3 py-2 text-xs font-medium text-paper backdrop-blur hover:border-white/40"
          >
            {ligada ? <VideoOff size={15} aria-hidden="true" /> : <Video size={15} aria-hidden="true" />}
            {ligada ? 'Desligar' : 'Ligar câmera'}
          </button>

          <button
            type="button"
            onClick={aoClicarCapturar}
            disabled={processando}
            aria-label={processando ? 'Capturando...' : `Capturar no modo ${nomesModos[modo]}`}
            className="grid size-16 place-items-center rounded-full border-4 border-paper bg-ink/40 text-paper transition-transform hover:scale-105 disabled:opacity-60"
          >
            {processando ? <LoaderCircle size={22} className="animate-spin" /> : <Camera size={22} />}
          </button>

          {ligada && podeVirar && (
            <button
              type="button"
              onClick={virar}
              aria-label={lado === 'user' ? 'Virar para a câmera traseira' : 'Virar para a câmera frontal'}
              className="grid size-12 place-items-center justify-self-end rounded-full border border-white/15 bg-ink/70 text-paper backdrop-blur transition-transform hover:border-white/40 active:scale-95"
            >
              <SwitchCamera size={20} aria-hidden="true" />
            </button>
          )}
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

      <p className="mt-4 px-1 text-sm leading-relaxed text-muted">{dica}</p>

      {(erroCamera || erro) && (
        <p role="alert" className="mt-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {erroCamera || erro}
        </p>
      )}
    </section>
  )
}
