import estilosModos, { nomesModos } from '../../data/estilosModos'

export default function Estatisticas({ total, porModo, porcentagemAuto, maisUsado }) {
  return (
    <section aria-labelledby="titulo-estatisticas" className="rounded-3xl border border-white/[0.07] bg-surface p-6">
      <h2 id="titulo-estatisticas" className="font-display text-xl font-bold">Estatísticas</h2>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-card p-4">
          <dt className="text-xs text-muted">Capturas</dt>
          <dd className="mt-1 font-mono text-3xl font-medium">{total}</dd>
        </div>
        <div className="rounded-2xl bg-card p-4">
          <dt className="text-xs text-muted">Via Auto</dt>
          <dd className="mt-1 font-mono text-3xl font-medium">{porcentagemAuto}%</dd>
        </div>
        <div className="rounded-2xl bg-card p-4">
          <dt className="text-xs text-muted">Mais usado</dt>
          <dd className={`mt-2 text-sm font-semibold ${maisUsado ? estilosModos[maisUsado.modo].texto : 'text-muted'}`}>
            {maisUsado ? nomesModos[maisUsado.modo] : '—'}
          </dd>
        </div>
      </dl>

      <h3 className="mt-7 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Capturas por modo</h3>
      <ul className="mt-4 grid gap-3">
        {porModo.map((item) => (
          <li key={item.modo} className="grid grid-cols-[5.5rem_1fr_3rem] items-center gap-3 text-sm">
            <span>{nomesModos[item.modo]}</span>
            <span className="h-2 overflow-hidden rounded-full bg-card" aria-hidden="true">
              <span
                className={`block h-full rounded-full transition-[width] duration-500 ${estilosModos[item.modo].barra}`}
                style={{ width: `${item.porcentagem}%` }}
              />
            </span>
            <span className="text-right font-mono text-xs text-muted">{item.porcentagem}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
