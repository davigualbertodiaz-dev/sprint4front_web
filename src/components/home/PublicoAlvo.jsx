import { GraduationCap, BookOpen, MessageCircle, Palette } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'

const perfis = [
  {
    icone: GraduationCap,
    titulo: 'Estudantes full-time',
    texto: 'Conciliam aula, trabalho e vida social. Não têm tempo de configurar câmera — precisam que ela já venha pronta pro momento.',
  },
  {
    icone: BookOpen,
    titulo: 'Rotina de estudos',
    texto: 'Digitalizar slide, quadro ou anotação no meio da aula precisa ser rápido e sem perspectiva torta.',
  },
  {
    icone: MessageCircle,
    titulo: 'Interação social',
    texto: 'Registrar amigos, pets e momentos do dia a dia exige uma câmera que entende o clima da cena sem precisar de ajuste manual.',
  },
  {
    icone: Palette,
    titulo: 'Auto expressão',
    texto: 'O celular é a ferramenta que esse público usa pra mostrar como enxerga o próprio mundo — a câmera precisa acompanhar esse ritmo.',
  },
]

export default function PublicoAlvo() {
  return (
    <section id="publico" aria-labelledby="titulo-publico" className="scroll-mt-20 bg-dark px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-publico"
          etiqueta="Pra quem é"
          titulo="Feita para quem vive em movimento."
          subtitulo="Estudantes full-time conciliam estudos, interações sociais e ambição. O smartphone os mantém conectados, produtivos e inspirados — mesmo na correria do dia a dia."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perfis.map((perfil) => {
            const Icone = perfil.icone
            return (
              <article
                key={perfil.titulo}
                className="rounded-3xl border border-white/[0.07] bg-card p-7 transition-colors hover:border-lime/30"
              >
                <Icone size={26} className="text-lime" aria-hidden="true" />
                <h3 className="mt-6 font-display text-xl font-bold">{perfil.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{perfil.texto}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
