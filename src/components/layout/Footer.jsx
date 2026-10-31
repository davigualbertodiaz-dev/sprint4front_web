import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-dark">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center lg:px-10">
        <p className="font-display text-xl font-extrabold tracking-tight">
          LensFlow<span className="text-lime">.</span>
        </p>
        <p className="text-sm text-muted md:text-center">
          © 2026 LensFlow - Câmera Adaptativa. Projeto acadêmico FIAP x JOVI, equipe StackOverfive.
        </p>
        <nav aria-label="Links do rodapé" className="flex gap-6 text-sm text-muted">
          <Link to="/#solucao" className="hover:text-paper">A Solução</Link>
          <Link to="/#equipe" className="hover:text-paper">Equipe</Link>
          <Link to="/#contato" className="hover:text-paper">Contato</Link>
        </nav>
      </div>
    </footer>
  )
}
