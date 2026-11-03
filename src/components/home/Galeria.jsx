import { useState } from 'react'
import { Expand } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'
import Lightbox from './Lightbox'
import galeria from '../../data/galeria'

const filtros = [
  { id: 'todas', texto: 'Todas' },
  { id: 'modos', texto: 'Modos' },
  { id: 'configuracoes', texto: 'Configurações' },
]

export default function Galeria() {
  const [filtro, setFiltro] = useState('todas')
  const [aberta, setAberta] = useState(null)

  const fotos = filtro === 'todas' ? galeria : galeria.filter((foto) => foto.categoria === filtro)

  function trocarFiltro(novo) {
    setFiltro(novo)
    setAberta(null)
  }

  // soma fotos.length pra não dar índice negativo
  function anterior() {
    setAberta((atual) => (atual - 1 + fotos.length) % fotos.length)
  }

  function proxima() {
    setAberta((atual) => (atual + 1) % fotos.length)
  }

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="scroll-mt-16 bg-zinc-900/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-galeria"
          etiqueta="Galeria"
          titulo="O protótipo,"
          destaque="tela por tela"
          subtitulo="Capturas reais do protótipo da LensFlow. Clique em uma imagem para ampliar."
        />

        <div role="group" aria-label="Filtrar galeria" className="mb-8 flex justify-center gap-2">
          {filtros.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filtro === item.id}
              onClick={() => trocarFiltro(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filtro === item.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-900 text-zinc-300 ring-1 ring-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {item.texto}
            </button>
          ))}
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((foto, indice) => (
            <li key={foto.id}>
              <button
                type="button"
                onClick={() => setAberta(indice)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-zinc-900 text-left shadow-sm ring-1 ring-zinc-800"
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  loading="lazy"
                  className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-110 group-hover:opacity-60"
                />
                {/* legenda que sobe ao passar o mouse */}
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-4 pt-10 pb-3 text-sm font-medium text-white">
                  {foto.titulo}
                  <Expand size={16} className="opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {aberta !== null && (
        <Lightbox
          foto={fotos[aberta]}
          posicao={aberta + 1}
          total={fotos.length}
          aoFechar={() => setAberta(null)}
          aoAnterior={anterior}
          aoProxima={proxima}
        />
      )}
    </section>
  )
}
