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
    <section
      aria-labelledby="titulo-simulador"
      className="rounded-2xl bg-zinc-900 p-4 shadow-sm ring-1 ring-zinc-800 sm:p-6"
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id="titulo-simulador" className="text-lg font-semibold">
          Simulador
        </h2>
        <p className="text-sm text-zinc-500">Modo {nomesModos[modo]}</p>
      </div>

      <div className="relative grid min-h-80 grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl text-white bg-zinc-900 sm:min-h-96">
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
          className={`pointer-events-none absolute inset-0 z-20 bg-zinc-900 transition-opacity duration-150 motion-reduce:hidden ${flash ? 'opacity-60' : 'opacity-0'}`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-3 px-2 pt-3">
          <BarraModos ativo={modo} aoEscolher={trocarModo} />

          <div role="status" className="min-h-14">
            {aviso && (
              <div
                key={aviso.titulo}
                className={`flex items-start gap-2 rounded-xl border bg-zinc-950/85 px-4 py-2 shadow ${estilo.borda}`}
              >
                <ScanSearch size={16} className={`mt-0.5 shrink-0 ${estilo.texto}`} aria-hidden="true" />
                <div>
                  <p className={`text-sm font-semibold ${estilo.texto}`}>{aviso.titulo}</p>
                  <p className="text-xs text-zinc-300">{aviso.detalhe}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 grid place-items-center">
          {ligada && (
            <p className="absolute top-0 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[10px] tracking-[0.2em] text-white">
              <span className="size-2 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
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
            className="inline-flex items-center gap-2 justify-self-start whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs font-medium text-white hover:border-white/40"
          >
            {ligada ? <VideoOff size={15} aria-hidden="true" /> : <Video size={15} aria-hidden="true" />}
            {ligada ? 'Desligar' : 'Ligar câmera'}
          </button>

          <button
            type="button"
            onClick={aoClicarCapturar}
            disabled={processando}
            aria-label={processando ? 'Capturando...' : `Capturar no modo ${nomesModos[modo]}`}
            className="grid size-16 place-items-center rounded-full border-4 border-white bg-black/30 text-white transition-transform hover:scale-105 disabled:opacity-60"
          >
            {processando ? <LoaderCircle size={22} className="animate-spin" /> : <Camera size={22} />}
          </button>

          {ligada && podeVirar && (
            <button
              type="button"
              onClick={virar}
              aria-label={lado === 'user' ? 'Virar para a câmera traseira' : 'Virar para a câmera frontal'}
              className="grid size-12 place-items-center justify-self-end rounded-full border border-white/15 bg-black/60 text-white transition-transform hover:border-white/40 active:scale-95"
            >
              <SwitchCamera size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {modo === 'estudo' && (
        <div className="mt-4">
          <label htmlFor="sessao" className="text-sm font-medium">
            Nome da sessão de estudo
          </label>
          <input
            id="sessao"
            type="text"
            value={nomeSessao}
            onChange={(evento) => setNomeSessao(evento.target.value)}
            placeholder="Ex: Matemática Cap. 5"
            className="mt-1 w-full rounded-lg border border-zinc-700 px-3 py-2.5 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none"
          />
        </div>
      )}

      <p className="mt-4 text-sm text-zinc-400">{dica}</p>

      {(erroCamera || erro) && (
        <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {erroCamera || erro}
        </p>
      )}
    </section>
  )
}
