export default function EstadoCarregamento({ carregando, erro, texto }) {
  if (carregando) {
    return (
      <p role="status" className="flex items-center gap-3 py-10 font-mono text-sm text-muted">
        <span className="ponto-rec size-2 rounded-full bg-lime" aria-hidden="true" />
        {texto}
      </p>
    )
  }

  if (erro) {
    return (
      <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm text-red-200">
        {erro}
      </p>
    )
  }

  return null
}
