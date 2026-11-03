import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import useAuth from '../hooks/useAuth'

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
    'mt-1 w-full rounded-lg border border-zinc-700 px-3 py-2.5 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none'

  return (
    <div className="relative isolate grid min-h-[85vh] place-items-center overflow-hidden bg-zinc-950 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-zinc-900 p-8 shadow-md">
        <span className="grid size-12 place-items-center rounded-xl bg-violet-500/15 text-violet-400">
          <Lock size={22} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Entrar no painel</h1>
        <p className="mt-1 text-sm text-zinc-400">O simulador da câmera e suas capturas ficam na área privada.</p>

        <form onSubmit={aoEnviar} noValidate className="mt-6 grid gap-4">
          <div>
            <label htmlFor="login" className="text-sm font-medium">
              Usuário
            </label>
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
            <label htmlFor="senha" className="text-sm font-medium">
              Senha
            </label>
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
            <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-violet-600 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-500"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
          <p className="font-medium">Dados de teste</p>
          <p className="mt-1 text-zinc-400">
            Usuário <code className="font-semibold text-white">jovi</code> · Senha{' '}
            <code className="font-semibold text-white">lensflow2026</code>
          </p>
          <button
            type="button"
            onClick={preencherTeste}
            className="mt-2 font-medium text-violet-400 hover:text-violet-300"
          >
            Preencher automaticamente
          </button>
        </div>
      </div>
    </div>
  )
}
