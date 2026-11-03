import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// estrutura que se repete em todas as páginas: cabeçalho, conteúdo e rodapé
export default function Layout() {
  const { pathname, hash } = useLocation()

  // ao trocar de página (sem âncora), volta para o topo
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased">
      <a
        href="#conteudo"
        className="sr-only z-[200] rounded-lg bg-violet-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
