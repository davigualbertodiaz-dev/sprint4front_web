// cartão de um integrante: recebe os dados por props
export default function MembroCard({ membro }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl bg-zinc-900 text-center shadow-sm ring-1 ring-zinc-800 transition hover:-translate-y-2 hover:shadow-xl">
      {/* faixa colorida no topo do cartão */}
      <div className="h-20 bg-violet-600 transition-all duration-500 group-hover:h-24" />
      <img
        src={membro.foto}
        alt={`Foto de ${membro.nome}`}
        loading="lazy"
        className="mx-auto -mt-12 size-24 rounded-full border-4 border-zinc-900 object-cover shadow-md"
      />
      <div className="px-4 pt-3 pb-6">
        <h3 className="font-semibold">{membro.nome}</h3>
        <p className="mt-2 inline-block rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
          {membro.funcao}
        </p>
      </div>
    </article>
  )
}
