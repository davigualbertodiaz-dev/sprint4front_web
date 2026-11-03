import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Camera, Menu, X } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useSecaoAtiva from '../../hooks/useSecaoAtiva'

// mesmas seções do menu da Sprint 3
const links = [
  { id: 'solucao', texto: 'A Solução' },
  { id: 'publico', texto: 'Público-Alvo' },
  { id: 'modos', texto: 'Modos' },
  { id: 'galeria', texto: 'Galeria' },
  { id: 'equipe', texto: 'Nossa Equipe' },
  { id: 'contato', texto: 'Contato' },
]

const ids = ['inicio', ...links.map((link) => link.id)]

export default function Header() {
  const { usuario } = useAuth()
  const { pathname } = useLocation()
  const ativa = useSecaoAtiva(ids, pathname === '/')
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link to="/" onClick={fecharMenu} className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="grid size-8 place-items-center rounded-lg bg-violet-600 text-white">
            <Camera size={18} aria-hidden="true" />
          </span>
          LensFlow
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  ativa === link.id ? 'bg-violet-500/15 text-violet-300' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.texto}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to={usuario ? '/painel' : '/login'}
            onClick={fecharMenu}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
          >
            {usuario ? 'Meu painel' : 'Entrar'}
          </Link>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-10 place-items-center rounded-lg text-zinc-300 hover:bg-zinc-800 lg:hidden"
          >
            {menuAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* menu do celular */}
      {menuAberto && (
        <ul id="menu-celular" className="border-t border-zinc-800 bg-zinc-900 px-4 py-3 lg:hidden">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                onClick={fecharMenu}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
              >
                {link.texto}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
