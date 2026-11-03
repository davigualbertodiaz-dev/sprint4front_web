import { X, Check } from 'lucide-react'
import TituloSecao from '../ui/TituloSecao'
import Revelar from '../ui/Revelar'

const passos = [
  { titulo: 'Você aponta a câmera', texto: 'Não precisa escolher modo nenhum. A câmera abre sempre no Automático.' },
  {
    titulo: 'A IA reconhece a cena',
    texto: 'Documento, pet, pessoa ou paisagem: a detecção roda o tempo todo enquanto você enquadra.',
  },
  {
    titulo: 'O modo certo liga e avisa',
    texto: 'Um aviso mostra o que mudou, tipo "Pessoa detectada - Mudando para Modo Retrato".',
  },
]

const antes = [
  'Câmera usada só no automático',
  'Modos escondidos em menus',
  'Foto do quadro torta e sem organização',
  'O pet não olha e o momento passa',
]

const depois = [
  'A IA escolhe o modo pela cena',
  'Aviso na tela a cada troca de modo',
  'Modo Estudo cria pastas e PDFs sozinho',
  'Modo Pet chama a atenção com som e luz',
]

const numeros = [
  { valor: '6', rotulo: 'modos de câmera' },
  { valor: '4', rotulo: 'cenas reconhecidas sozinha' },
  { valor: '5', rotulo: 'integrantes na equipe' },
]

export default function Solucao() {
  return (
    <section id="solucao" aria-labelledby="titulo-solucao" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-solucao"
          etiqueta="A Solução"
          titulo="O modo certo,"
          destaque="sem você procurar"
          subtitulo="Desafio JOVI 2026: tornar a câmera do smartphone mais intuitiva, funcional e contextual para o dia a dia."
        />

        {/* comparação: como é hoje x como fica com a LensFlow */}
        <div className="grid gap-6 md:grid-cols-2">
          <Revelar className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-sm font-semibold text-zinc-500">Câmera comum</p>
            <ul className="mt-5 grid gap-3">
              {antes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-400">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400">
                    <X size={14} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Revelar>
          <Revelar atraso={150} className="rounded-3xl bg-violet-600 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold text-violet-200">Com a LensFlow</p>
            <ul className="mt-5 grid gap-3">
              {depois.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/20">
                    <Check size={14} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Revelar>
        </div>

        {/* os passos acontecem nessa ordem, por isso a lista é numerada */}
        <h3 className="mt-20 text-center text-sm font-semibold tracking-wide text-zinc-500 uppercase">Como funciona</h3>
        <ol className="relative mt-8 grid gap-8 md:grid-cols-3">
          <span
            className="absolute top-6 right-[16%] left-[16%] hidden h-0.5 bg-violet-600 md:block"
            aria-hidden="true"
          />
          {passos.map((passo, indice) => (
            <li key={passo.titulo}>
              <Revelar atraso={indice * 150} className="relative text-center">
                <span className="relative mx-auto grid size-12 place-items-center rounded-full bg-violet-600 text-lg font-bold text-white ring-8 ring-zinc-950">
                  {indice + 1}
                </span>
                <h4 className="mt-5 text-lg font-semibold">{passo.titulo}</h4>
                <p className="mt-2 text-zinc-400">{passo.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>

        <Revelar className="mt-20">
          <dl className="grid divide-y divide-white/10 rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 p-8 text-center text-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {numeros.map((numero) => (
              <div key={numero.rotulo} className="py-4 sm:py-0">
                <dd className="bg-violet-600 bg-clip-text text-5xl font-bold text-transparent">{numero.valor}</dd>
                <dt className="mt-2 text-sm text-zinc-400">{numero.rotulo}</dt>
              </div>
            ))}
          </dl>
        </Revelar>
      </div>
    </section>
  )
}
