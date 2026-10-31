import TituloSecao from '../ui/TituloSecao'
import EstadoCarregamento from '../ui/EstadoCarregamento'
import MembroCard from './MembroCard'

export default function Equipe({ equipe, carregando, erro }) {
  return (
    <section id="equipe" aria-labelledby="titulo-equipe" className="scroll-mt-20 bg-dark px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-equipe"
          etiqueta="StackOverfive"
          titulo="Nossa equipe."
          subtitulo="Cinco pessoas, um projeto: repensar a câmera do smartphone JOVI para quem vive a rotina de estudante full-time."
        />

        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando a equipe..." />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {equipe.map((membro) => (
            <MembroCard key={membro.id} membro={membro} />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">*Funções da equipe referentes à disciplina de Front-End Design.</p>
      </div>
    </section>
  )
}
