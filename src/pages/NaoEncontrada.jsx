import { Link } from 'react-router-dom'

// página 404: qualquer endereço que não existe cai aqui
export default function NaoEncontrada() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 py-24 text-center">
      <div>
        <p className="text-7xl font-bold text-violet-400 blur-[2px]">404</p>
        <h1 className="mt-4 text-3xl font-bold">Essa página saiu de foco.</h1>
        <p className="mt-2 text-zinc-400">O endereço digitado não existe no site da LensFlow.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
