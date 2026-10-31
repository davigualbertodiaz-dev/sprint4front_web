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
    <section id="galeria" aria-labelledby="titulo-galeria" className="scroll-mt-20 bg-dark px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-galeria"
          etiqueta="Galeria"
          titulo="O protótipo, tela por tela."
          subtitulo="Capturas reais do protótipo da LensFlow. Toque em uma imagem para ampliar."
        />

        <div role="group" aria-label="Filtrar galeria" className="mb-8 flex flex-wrap gap-2">
          {filtros.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filtro === item.id}
              onClick={() => trocarFiltro(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filtro === item.id
                  ? 'border-lime bg-lime text-ink'
                  : 'border-white/15 text-muted hover:border-white/40 hover:text-paper'
              }`}
            >
              {item.texto}
            </button>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((foto, indice) => (
            <li key={foto.id}>
              <button
                type="button"
                onClick={() => setAberta(indice)}
                className="group block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-card text-left"
              >
                <span className="relative block overflow-hidden">
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand size={15} aria-hidden="true" />
                  </span>
                </span>
                <span className="block px-4 py-3 text-sm font-medium">{foto.titulo}</span>
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
