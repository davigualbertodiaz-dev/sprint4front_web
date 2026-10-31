import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import Cantoneiras from '../components/ui/Cantoneiras'

export default function Login() {
  const { usuario, entrar } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const destino = location.state?.origem || '/painel'

  if (usuario) return <Navigate to={destino} replace />

  function aoEnviar(evento) {
    evento.preventDefault()
    if (login.trim() === '' || senha === '') {
      setErro('Preencha usuário e senha.')
      return
    }
    const deuCerto = entrar(login, senha)
    if (deuCerto) {
      navigate(destino, { replace: true })
    } else {
      setErro('Usuário ou senha incorretos. Confira os dados de teste abaixo do formulário.')
    }
  }

  function preencherTeste() {
    setLogin('jovi')
    setSenha('lensflow2026')
    setErro('')
  }

  const classeCampo =
    'mt-2 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-paper placeholder:text-muted/70 focus:border-lime focus:outline-none'

  return (
    <div className="grid min-h-screen place-items-center px-4 pt-24 pb-16">
      <div className="cantoneiras w-full max-w-md p-3" style={{ '--cor-foco': '#e8ff47' }}>
        <Cantoneiras />
        <section aria-labelledby="titulo-login" className="rounded-3xl border border-white/[0.07] bg-surface p-7 sm:p-9">
          <Lock size={22} className="text-lime" aria-hidden="true" />
          <h1 id="titulo-login" className="mt-5 font-display text-3xl font-extrabold tracking-tight">Entrar no painel</h1>
          <p className="mt-2 text-sm text-muted">O simulador da câmera e suas capturas ficam na área privada.</p>

          <form onSubmit={aoEnviar} noValidate className="mt-7 grid gap-5">
            <div>
              <label htmlFor="login" className="text-sm font-medium">Usuário</label>
              <input
                id="login"
                type="text"
                autoComplete="username"
                value={login}
                onChange={(evento) => setLogin(evento.target.value)}
                className={classeCampo}
              />
            </div>
            <div>
              <label htmlFor="senha" className="text-sm font-medium">Senha</label>
              <input
                id="senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                className={classeCampo}
              />
            </div>

            {erro && (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Entrar
            </button>
          </form>

          <div className="mt-7 rounded-2xl border border-dashed border-white/15 p-4 text-sm">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Dados de teste</p>
            <p className="mt-2">
              Usuário <code className="font-mono text-lime">jovi</code> · Senha{' '}
              <code className="font-mono text-lime">lensflow2026</code>
            </p>
            <button type="button" onClick={preencherTeste} className="mt-3 text-sm font-medium text-paper underline underline-offset-4 hover:text-lime">
              Preencher automaticamente
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
