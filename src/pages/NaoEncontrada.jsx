import { Link } from 'react-router-dom'
import Cantoneiras from '../components/ui/Cantoneiras'

export default function NaoEncontrada() {
  return (
    <div className="grid min-h-screen place-items-center px-4 pt-24 pb-16 text-center">
      <div>
        <div className="cantoneiras mx-auto grid size-44 place-items-center" style={{ '--cor-foco': '#e8ff47' }}>
          <Cantoneiras />
          <span className="font-display text-6xl font-extrabold text-paper/20 blur-[2px]">404</span>
        </div>
        <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight">Essa página saiu de foco.</h1>
        <p className="mt-3 text-muted">O endereço digitado não existe no site da LensFlow.</p>
        <Link to="/" className="mt-7 inline-block rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink">
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
