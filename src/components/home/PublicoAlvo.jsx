import { GraduationCap, BookOpen, MessageCircle, Palette } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'
import Revelar from '../ui/Revelar'

const perfis = [
  {
    icone: BookOpen,
    titulo: 'Rotina de estudos',
    texto: 'Digitalizar slide, quadro ou anotação no meio da aula precisa ser rápido e sem perspectiva torta.',
    cor: 'bg-blue-500/15 text-blue-400',
  },
  {
    icone: MessageCircle,
    titulo: 'Interação social',
    texto:
      'Registrar amigos, pets e momentos do dia a dia exige uma câmera que entende o clima da cena sem precisar de ajuste manual.',
    cor: 'bg-green-500/15 text-green-400',
  },
  {
    icone: Palette,
    titulo: 'Auto expressão',
    texto:
      'O celular é a ferramenta que esse público usa pra mostrar como enxerga o próprio mundo, e a câmera precisa acompanhar esse ritmo.',
    cor: 'bg-orange-500/15 text-orange-400',
  },
]

export default function PublicoAlvo() {
  return (
    <section id="publico" aria-labelledby="titulo-publico" className="scroll-mt-16 bg-zinc-900/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-publico"
          etiqueta="Pra quem é"
          titulo="Feita para quem vive"
          destaque="em movimento"
          subtitulo="Estudantes full-time conciliam estudos, interações sociais e ambição. O smartphone os mantém conectados, produtivos e inspirados."
        />

        {/* mosaico: um cartão grande e três menores */}
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          <Revelar className="relative overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 p-8 text-white lg:row-span-2">
            <span className="relative grid size-12 place-items-center rounded-2xl bg-white/10 text-violet-300">
              <GraduationCap size={26} aria-hidden="true" />
            </span>
            <h3 className="relative mt-6 text-2xl font-bold">Estudantes full-time</h3>
            <p className="relative mt-3 leading-relaxed text-zinc-400">
              Conciliam aula, trabalho e vida social. Não têm tempo de configurar câmera, precisam que ela já venha
              pronta pro momento.
            </p>
            <img
              src="/img/estudo.png"
              alt="Modo Estudo do protótipo pedindo o nome da sessão"
              loading="lazy"
              className="relative mt-8 w-full rounded-xl border border-white/10"
            />
          </Revelar>

          {perfis.map((perfil, indice) => {
            const Icone = perfil.icone
            return (
              <Revelar
                key={perfil.titulo}
                atraso={indice * 120}
                className={`rounded-3xl bg-zinc-900 p-7 shadow-sm ring-1 ring-zinc-800 transition hover:-translate-y-1 hover:shadow-lg ${
                  indice === 2 ? 'lg:col-span-2' : ''
                }`}
              >
                <span className={`grid size-11 place-items-center rounded-xl ${perfil.cor}`}>
                  <Icone size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{perfil.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{perfil.texto}</p>
              </Revelar>
            )
          })}
        </div>
      </div>
    </section>
  )
}
