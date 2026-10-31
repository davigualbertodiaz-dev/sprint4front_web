export default function TituloSecao({ etiqueta, titulo, subtitulo, id }) {
  return (
    <header className="mb-10 max-w-2xl md:mb-14">
      <p className="mb-4 font-mono text-xs tracking-[0.18em] text-lime uppercase">{etiqueta}</p>
      <h2 id={id} className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
        {titulo}
      </h2>
      {subtitulo && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitulo}</p>}
    </header>
  )
}
