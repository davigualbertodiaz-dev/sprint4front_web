import { Link } from 'react-router-dom'
import { Camera } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-bold text-white">
          <Camera size={18} className="text-violet-400" aria-hidden="true" />
          LensFlow
        </div>
        <p className="text-sm">
          © 2026 LensFlow - Câmera Adaptativa. Projeto acadêmico FIAP x JOVI, equipe StackOverfive.
        </p>
        <nav aria-label="Links do rodapé" className="flex gap-5 text-sm">
          <Link to="/#solucao" className="hover:text-white">
            A Solução
          </Link>
          <Link to="/#equipe" className="hover:text-white">
            Equipe
          </Link>
          <Link to="/#contato" className="hover:text-white">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  )
}
