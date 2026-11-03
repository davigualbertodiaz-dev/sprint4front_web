import estilosModos from '../../data/estilosModos'

export default function SeloModo({ modo, nome }) {
  const estilo = estilosModos[modo]
  const Icone = estilo.icone

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${estilo.fundo} ${estilo.borda} ${estilo.texto}`}
    >
      <Icone size={14} aria-hidden="true" />
      {nome}
    </span>
  )
}
