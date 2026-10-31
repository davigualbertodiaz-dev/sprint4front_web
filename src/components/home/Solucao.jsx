import TituloSecao from '../ui/TituloSecao'

const passos = [
  { titulo: 'Você aponta a câmera', texto: 'Não precisa escolher modo nenhum. A câmera abre sempre no Automático.' },
  { titulo: 'A IA reconhece a cena', texto: 'Documento, pet, pessoa ou paisagem: a detecção roda o tempo todo enquanto você enquadra.' },
  { titulo: 'O modo certo liga e avisa', texto: 'Um aviso mostra o que mudou, tipo "Pessoa detectada — mudando para Modo Retrato".' },
]

export default function Solucao() {
  return (
    <section id="solucao" aria-labelledby="titulo-solucao" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-solucao"
          etiqueta="A Solução"
          titulo="O modo certo, sem você procurar."
          subtitulo="Desafio JOVI 2026: tornar a câmera do smartphone mais intuitiva, funcional e contextual para o dia a dia."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <article className="rounded-3xl border border-white/[0.07] bg-surface p-7 sm:p-9">
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">O problema</h3>
            <p className="mt-5 font-display text-2xl leading-snug font-bold sm:text-3xl">
              A maioria das pessoas usa a câmera só no automático.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              A interface confunde, os modos ficam escondidos em menus e falta função pensada para a rotina real.
              Resultado: o potencial do aparelho fica parado, e a foto do quadro, do pet ou do amigo sai pior do que
              poderia.
            </p>
          </article>

          <article className="rounded-3xl border border-white/[0.07] bg-surface p-7 sm:p-9">
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Como funciona</h3>
            <ol className="mt-5 grid gap-6">
              {passos.map((passo, indice) => (
                <li key={passo.titulo} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="grid size-9 place-items-center rounded-full border border-lime/40 font-mono text-sm text-lime">
                    {indice + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{passo.titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{passo.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <figure className="mt-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-surface">
          <img
            src="/img/auto.png"
            alt="Protótipo da câmera LensFlow: modo Automático detectando uma pessoa e sugerindo o Modo Retrato"
            width="1400" height="618"
            className="w-full"
            loading="lazy"
          />
          <figcaption className="border-t border-white/[0.07] px-6 py-4 text-sm text-muted">
            Protótipo da LensFlow no modo Automático: a câmera detectou uma pessoa e avisou a troca para o Retrato.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
