import Revelar from './Revelar'

// título padrão das seções. "escuro" deixa o texto claro para fundos pretos
export default function TituloSecao({ etiqueta, titulo, destaque, subtitulo, id, escuro = false }) {
  return (
    <Revelar className="mx-auto mb-14 max-w-2xl text-center">
      <p className={`text-sm font-semibold ${escuro ? 'text-violet-300' : 'text-violet-400'}`}>{etiqueta}</p>
      <h2
        id={id}
        className={`mt-2 text-3xl font-bold tracking-tight sm:text-5xl ${escuro ? 'text-white' : 'text-white'}`}
      >
        {titulo} {destaque && <span className="text-violet-400">{destaque}</span>}
      </h2>
      {subtitulo && <p className={`mt-4 text-lg ${escuro ? 'text-zinc-400' : 'text-zinc-400'}`}>{subtitulo}</p>}
    </Revelar>
  )
}
