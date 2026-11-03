import TituloSecao from '../ui/TituloSecao'
import EstadoCarregamento from '../ui/EstadoCarregamento'
import MembroCard from './MembroCard'
import Revelar from '../ui/Revelar'

export default function Equipe({ equipe, carregando, erro }) {
  return (
    <section id="equipe" aria-labelledby="titulo-equipe" className="scroll-mt-16 bg-zinc-900/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-equipe"
          etiqueta="StackOverfive"
          titulo="Nossa"
          destaque="equipe"
          subtitulo="Cinco pessoas, um projeto: repensar a câmera do smartphone JOVI para quem vive a rotina de estudante full-time."
        />

        <EstadoCarregamento carregando={carregando} erro={erro} texto="Carregando a equipe..." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {equipe.map((membro, indice) => (
            <Revelar key={membro.id} atraso={indice * 100}>
              <MembroCard membro={membro} />
            </Revelar>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          *Funções da equipe referentes à disciplina de Front-End Design.
        </p>
      </div>
    </section>
  )
}
