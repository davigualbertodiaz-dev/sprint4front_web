import Cantoneiras from '../ui/Cantoneiras'

export default function MembroCard({ membro }) {
  return (
    <article className="foco-hover rounded-3xl border border-white/[0.07] bg-card p-6 text-center">
      <div className="cantoneiras mx-auto grid size-36 place-items-center" style={{ '--cor-foco': '#e8ff47' }}>
        <Cantoneiras />
        <img
          src={membro.foto}
          alt={`Foto de ${membro.nome}`}
          loading="lazy"
          className="size-28 rounded-full object-cover"
        />
      </div>
      <h3 className="mt-5 font-display text-lg leading-tight font-bold">{membro.nome}</h3>
      <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{membro.funcao}</p>
    </article>
  )
}
