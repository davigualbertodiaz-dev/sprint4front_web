export default function EstadoCarregamento({ carregando, erro, texto }) {
  if (carregando) {
    return (
      <p role="status" className="py-10 text-center text-zinc-500">
        {texto}
      </p>
    )
  }

  if (erro) {
    return (
      <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {erro}
      </p>
    )
  }

  return null
}
