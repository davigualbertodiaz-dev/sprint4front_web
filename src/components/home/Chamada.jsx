import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Revelar from '../ui/Revelar'

// faixa de chamada com o texto final da Sprint 3
export default function Chamada() {
  return (
    <section aria-labelledby="titulo-chamada" className="px-4 py-10 sm:px-6">
      <Revelar className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-violet-600 px-6 py-16 text-center text-white shadow-md sm:px-12">
        <h2 id="titulo-chamada" className="text-3xl font-bold tracking-tight sm:text-5xl">
          Pronto para ver o mundo de outro ângulo?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-violet-100">
          LensFlow. Um projeto de Engenharia de Software, FIAP x JOVI Challenge 2026.
        </p>
        <Link
          to="/painel"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg transition hover:bg-violet-100"
        >
          Testar o simulador
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Revelar>
    </section>
  )
}
