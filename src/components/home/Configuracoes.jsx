import { ScanSearch, Repeat, Hand, Grid3x3, FolderOpen, ZoomIn } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'
import Revelar from '../ui/Revelar'

const recursos = [
  {
    icone: ScanSearch,
    titulo: 'Detecção Automática',
    texto: 'Identifica documentos, pets, pessoas e paisagens sozinha.',
  },
  { icone: Repeat, titulo: 'Mudança Automática de Modo', texto: 'Troca de modo assim que detecta o contexto certo.' },
  { icone: Hand, titulo: 'Estabilização de Imagem', texto: 'Reduz tremores e borrões na captura.' },
  { icone: Grid3x3, titulo: 'Linhas de Grade', texto: 'Auxilia no enquadramento da cena.' },
  { icone: FolderOpen, titulo: 'Organização Automática', texto: 'Cria pastas e PDFs no Modo Estudo.' },
  { icone: ZoomIn, titulo: 'Zoom e Flash', texto: 'Disponíveis em todos os modos, sem exceção.' },
]

export default function Configuracoes() {
  return (
    <section
      id="configuracoes"
      aria-labelledby="titulo-config"
      className="relative isolate scroll-mt-16 overflow-hidden bg-zinc-950 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-config"
          escuro
          etiqueta="Configurações"
          titulo="O que roda"
          destaque="por trás"
          subtitulo="Recursos que ficam ligados nos bastidores, ajustáveis em Configurações > Câmera JOVI Inteligente."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recursos.map((recurso, indice) => {
            const Icone = recurso.icone
            return (
              <li key={recurso.titulo}>
                <Revelar
                  atraso={(indice % 3) * 100}
                  className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Icone size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{recurso.titulo}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{recurso.texto}</p>
                </Revelar>
              </li>
            )
          })}
        </ul>

        <Revelar className="mx-auto mt-14 max-w-4xl">
          <figure className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <img
              src="/img/config-1.png"
              alt="Tela de Configurações da Câmera JOVI Inteligente, com a Detecção Automática e a Mudança Automática de Modo"
              width="1400"
              height="608"
              loading="lazy"
              className="w-full rounded-xl"
            />
            <figcaption className="py-3 text-center text-sm text-zinc-500">
              Tela de Configurações do protótipo.
            </figcaption>
          </figure>
        </Revelar>
      </div>
    </section>
  )
}
