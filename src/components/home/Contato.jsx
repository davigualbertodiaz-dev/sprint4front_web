import { useState } from 'react'
import { Send } from 'lucide-react'
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
    'mt-2 w-full rounded-xl border bg-ink px-4 py-3 text-paper placeholder:text-muted/70 focus:border-lime focus:outline-none'

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-16 max-w-4xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
          Pronto para ver o mundo de outro <em className="text-lime">ângulo?</em>
        </p>

        <TituloSecao
          id="titulo-contato"
          etiqueta="Fale com a gente"
          titulo="Contato"
          subtitulo="Alguma dúvida ou feedback sobre o projeto LensFlow? Fala com a equipe StackOverfive."
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={aoEnviar}
            noValidate
            className="grid gap-5 rounded-3xl border border-white/[0.07] bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="text-sm font-medium">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={campos.nome}
                  onChange={aoDigitar}
                  placeholder="Seu nome"
                  aria-invalid={erros.nome ? 'true' : 'false'}
                  aria-describedby={erros.nome ? 'erro-nome' : undefined}
                  className={`${classeCampo} ${erros.nome ? 'border-red-400/60' : 'border-white/10'}`}
                />
                {erros.nome && <p id="erro-nome" className="mt-2 text-xs text-red-300">{erros.nome}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={campos.email}
                  onChange={aoDigitar}
                  placeholder="seuemail@exemplo.com"
                  aria-invalid={erros.email ? 'true' : 'false'}
                  aria-describedby={erros.email ? 'erro-email' : undefined}
                  className={`${classeCampo} ${erros.email ? 'border-red-400/60' : 'border-white/10'}`}
                />
                {erros.email && <p id="erro-email" className="mt-2 text-xs text-red-300">{erros.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className="text-sm font-medium">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="5"
                value={campos.mensagem}
                onChange={aoDigitar}
                placeholder="Escreva sua mensagem"
                aria-invalid={erros.mensagem ? 'true' : 'false'}
                aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
                className={`${classeCampo} resize-y ${erros.mensagem ? 'border-red-400/60' : 'border-white/10'}`}
              />
              {erros.mensagem && <p id="erro-mensagem" className="mt-2 text-xs text-red-300">{erros.mensagem}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                <Send size={16} aria-hidden="true" /> Enviar mensagem
              </button>
              <p role="status" className="text-sm text-mint">
                {enviado && 'Mensagem enviada. Como é um projeto acadêmico, ela fica salva neste navegador.'}
              </p>
            </div>
            <p className="text-xs text-muted">Mensagens salvas neste navegador: {mensagens.length}</p>
          </form>

          <aside className="rounded-3xl border border-white/[0.07] bg-surface p-6 sm:p-8" aria-labelledby="titulo-contato-equipe">
            <h3 id="titulo-contato-equipe" className="font-display text-xl font-bold">Equipe StackOverfive</h3>
            <ul className="mt-5 grid gap-3">
              {equipe.map((membro) => (
                <li key={membro.id} className="flex items-center gap-3">
                  <img src={membro.foto} alt="" className="size-9 rounded-full object-cover" loading="lazy" />
                  <span className="text-sm">{membro.nome}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-muted">
              Projeto desenvolvido em parceria FIAP × JOVI Smartphone — Challenge 2026.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
