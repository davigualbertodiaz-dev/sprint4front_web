import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

const links = [
  { href: '/#solucao', texto: 'A Solução' },
  { href: '/#publico', texto: 'Público-Alvo' },
  { href: '/#modos', texto: 'Modos' },
  { href: '/#galeria', texto: 'Galeria' },
  { href: '/#equipe', texto: 'Nossa Equipe' },
  { href: '/#contato', texto: 'Contato' },
]

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { usuario } = useAuth()

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-ink/85 backdrop-blur-xl">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        <Link to="/" onClick={fecharMenu} className="font-display text-xl font-extrabold tracking-tight">
          LensFlow<span className="text-lime">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          className="grid size-10 place-items-center rounded-full text-paper hover:bg-white/5 lg:hidden"
        >
          {menuAberto ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul
          id="menu-principal"
          className={`${menuAberto ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col gap-1 border-b border-white/[0.07] bg-ink px-4 pt-2 pb-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={fecharMenu}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-paper lg:p-0"
              >
                {link.texto}
              </Link>
            </li>
          ))}
          <li className="mt-2 lg:mt-0">
            <NavLink
              to={usuario ? '/painel' : '/login'}
              onClick={fecharMenu}
              className="inline-flex items-center rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {usuario ? 'Meu painel' : 'Entrar'}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
