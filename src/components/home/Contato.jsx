import { Send } from 'lucide-react'
import { useState } from 'react'
import TituloSecao from '../ui/TituloSecao'
import useLocalStorage from '../../hooks/useLocalStorage'

const formularioVazio = { nome: '', email: '', mensagem: '' }

function validar(campos) {
  const erros = {}
  if (campos.nome.trim().length < 2) {
    erros.nome = 'Digite seu nome (pelo menos 2 letras).'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email)) {
    erros.email = 'Digite um e-mail válido, como nome@exemplo.com.'
  }
  if (campos.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  }
  return erros
}

export default function Contato({ equipe }) {
  const [campos, setCampos] = useState(formularioVazio)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [mensagens, setMensagens] = useLocalStorage('lensflow:mensagens', [])

  function aoDigitar(evento) {
    const { name, value } = evento.target
    setCampos({ ...campos, [name]: value })
    setEnviado(false)
  }

  function aoEnviar(evento) {
    evento.preventDefault()
    const errosEncontrados = validar(campos)
    setErros(errosEncontrados)

    if (Object.keys(errosEncontrados).length > 0) return

    setMensagens([...mensagens, { ...campos, data: new Date().toISOString() }])
    setCampos(formularioVazio)
    setEnviado(true)
  }

  const classeCampo =
    'mt-1 w-full rounded-lg border px-3 py-2.5 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none'

  // borda vermelha quando o campo tem erro
  function borda(campo) {
    return erros[campo] ? 'border-red-400' : 'border-zinc-700'
  }

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TituloSecao
          id="titulo-contato"
          etiqueta="Fale com a gente"
          titulo="Vamos"
          destaque="conversar"
          subtitulo="Alguma dúvida ou feedback sobre o projeto LensFlow? Fala com a equipe StackOverfive."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={aoEnviar}
            noValidate
            className="grid gap-5 rounded-2xl bg-zinc-900 p-6 shadow-sm ring-1 ring-zinc-800 sm:p-8 lg:col-span-2"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="text-sm font-medium">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={campos.nome}
                  onChange={aoDigitar}
                  placeholder="Seu nome"
                  aria-invalid={erros.nome ? 'true' : 'false'}
                  aria-describedby={erros.nome ? 'erro-nome' : undefined}
                  className={`${classeCampo} ${borda('nome')}`}
                />
                {erros.nome && (
                  <p id="erro-nome" className="mt-1 text-sm text-red-400">
                    {erros.nome}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={campos.email}
                  onChange={aoDigitar}
                  placeholder="seuemail@exemplo.com"
                  aria-invalid={erros.email ? 'true' : 'false'}
                  aria-describedby={erros.email ? 'erro-email' : undefined}
                  className={`${classeCampo} ${borda('email')}`}
                />
                {erros.email && (
                  <p id="erro-email" className="mt-1 text-sm text-red-400">
                    {erros.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className="text-sm font-medium">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="5"
                value={campos.mensagem}
                onChange={aoDigitar}
                placeholder="Escreva sua mensagem"
                aria-invalid={erros.mensagem ? 'true' : 'false'}
                aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
                className={`${classeCampo} ${borda('mensagem')}`}
              />
              {erros.mensagem && (
                <p id="erro-mensagem" className="mt-1 text-sm text-red-400">
                  {erros.mensagem}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
              >
                <Send size={16} aria-hidden="true" /> Enviar mensagem
              </button>
              <p role="status" className="text-sm text-green-400">
                {enviado && 'Mensagem enviada! Como é um projeto acadêmico, ela fica salva neste navegador.'}
              </p>
            </div>
            <p className="text-xs text-zinc-500">Mensagens salvas neste navegador: {mensagens.length}</p>
          </form>

          <aside
            aria-labelledby="titulo-contato-equipe"
            className="relative isolate overflow-hidden rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800 text-white sm:p-8"
          >
            <h3 id="titulo-contato-equipe" className="text-lg font-semibold">
              Equipe StackOverfive
            </h3>
            <ul className="mt-5 grid gap-3">
              {equipe.map((membro) => (
                <li key={membro.id} className="flex items-center gap-3 text-sm">
                  <img src={membro.foto} alt="" className="size-9 rounded-full object-cover" loading="lazy" />
                  {membro.nome}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-zinc-700 pt-4 text-sm text-zinc-400">
              Projeto desenvolvido em parceria FIAP x JOVI Smartphone, Challenge 2026.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
