import estilosModos, { nomesModos } from '../../data/estilosModos'

export default function Estatisticas({ total, porModo, porcentagemAuto, maisUsado }) {
  return (
    <section
      aria-labelledby="titulo-estatisticas"
      className="rounded-2xl bg-zinc-900 p-6 shadow-sm ring-1 ring-zinc-800"
    >
      <h2 id="titulo-estatisticas" className="text-lg font-semibold">
        Estatísticas
      </h2>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-zinc-800 p-3">
          <dt className="text-xs text-zinc-500">Capturas</dt>
          <dd className="mt-1 text-2xl font-bold">{total}</dd>
        </div>
        <div className="rounded-xl bg-zinc-800 p-3">
          <dt className="text-xs text-zinc-500">Via Auto</dt>
          <dd className="mt-1 text-2xl font-bold">{porcentagemAuto}%</dd>
        </div>
        <div className="rounded-xl bg-zinc-800 p-3">
          <dt className="text-xs text-zinc-500">Mais usado</dt>
          <dd className="mt-2 text-sm font-semibold">{maisUsado ? nomesModos[maisUsado.modo] : '-'}</dd>
        </div>
      </dl>

      <h3 className="mt-6 text-sm font-medium text-zinc-500">Capturas por modo</h3>
      <ul className="mt-3 grid gap-3">
        {porModo.map((item) => (
          <li key={item.modo} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3 text-sm">
            <span>{nomesModos[item.modo]}</span>
            <span className="h-2 overflow-hidden rounded-full bg-zinc-800" aria-hidden="true">
              <span
                className={`block h-full rounded-full transition-all duration-500 ${estilosModos[item.modo].barra}`}
                style={{ width: `${item.porcentagem}%` }}
              />
            </span>
            <span className="text-right text-zinc-500">{item.porcentagem}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
