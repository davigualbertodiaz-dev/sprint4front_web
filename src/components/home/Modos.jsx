import TituloSecao from '../ui/TituloSecao'
import EstadoCarregamento from '../ui/EstadoCarregamento'
import ModoCard from './ModoCard'

export default function Modos({ modos, carregando, erro }) {
  return (
    <section id="modos" aria-labelledby="titulo-modos" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-modos"
          etiqueta="Sistema de câmera"
          titulo="Seis modos. Uma câmera."
          subtitulo="Cada modo foi projetado para uma situação real. A IA detecta o contexto e ajusta tudo automaticamente."
        />

        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando os modos da câmera…" />

        <div className="grid gap-6">
          {modos.map((modo, indice) => (
            <ModoCard key={modo.id} modo={modo} invertido={indice % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
