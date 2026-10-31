import { ScanSearch, Repeat, Hand, Grid3x3, FolderOpen, ZoomIn } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'

const recursos = [
  { icone: ScanSearch, titulo: 'Detecção Automática', texto: 'Identifica documentos, pets, pessoas e paisagens sozinha.' },
  { icone: Repeat, titulo: 'Mudança Automática de Modo', texto: 'Troca de modo assim que detecta o contexto certo.' },
  { icone: Hand, titulo: 'Estabilização de Imagem', texto: 'Reduz tremores e borrões na captura.' },
  { icone: Grid3x3, titulo: 'Linhas de Grade', texto: 'Auxilia no enquadramento da cena.' },
  { icone: FolderOpen, titulo: 'Organização Automática', texto: 'Cria pastas e PDFs no Modo Estudo.' },
  { icone: ZoomIn, titulo: 'Zoom e Flash', texto: 'Disponíveis em todos os modos, sem exceção.' },
]

export default function Configuracoes() {
  return (
    <section id="configuracoes" aria-labelledby="titulo-config" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <TituloSecao
            id="titulo-config"
            etiqueta="Configurações"
            titulo="O que roda por trás."
            subtitulo="Recursos que ficam ligados nos bastidores, ajustáveis em Configurações > Câmera JOVI Inteligente."
          />
          <ul className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {recursos.map((recurso) => {
              const Icone = recurso.icone
              return (
                <li key={recurso.titulo} className="grid grid-cols-[auto_1fr] gap-3">
                  <Icone size={20} className="mt-0.5 text-lime" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{recurso.titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{recurso.texto}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <figure className="overflow-hidden rounded-3xl border border-white/[0.07] bg-surface lg:sticky lg:top-24">
          <img
            src="/img/config-1.png"
            alt="Tela de Configurações da Câmera JOVI Inteligente, com a Detecção Automática e a Mudança Automática de Modo"
            width="1400" height="608"
            className="w-full"
            loading="lazy"
          />
          <figcaption className="border-t border-white/[0.07] px-6 py-4 text-sm text-muted">
            Tela de Configurações do protótipo — é daqui que vêm os recursos ao lado.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
