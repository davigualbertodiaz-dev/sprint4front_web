import { Sparkles, FileText, PawPrint, User, Mountain, SlidersHorizontal } from 'lucide-react'

// classes completas aqui porque o Tailwind não gera classe montada com template string
const estilosModos = {
  auto: {
    icone: Sparkles,
    texto: 'text-auto',
    fundo: 'bg-auto/15',
    borda: 'border-auto/40',
    barra: 'bg-auto',
    corHex: '#fb923c',
  },
  estudo: {
    icone: FileText,
    texto: 'text-estudo',
    fundo: 'bg-estudo/15',
    borda: 'border-estudo/40',
    barra: 'bg-estudo',
    corHex: '#60a5fa',
  },
  pet: {
    icone: PawPrint,
    texto: 'text-pet',
    fundo: 'bg-pet/15',
    borda: 'border-pet/40',
    barra: 'bg-pet',
    corHex: '#4ade80',
  },
  retrato: {
    icone: User,
    texto: 'text-retrato',
    fundo: 'bg-retrato/15',
    borda: 'border-retrato/40',
    barra: 'bg-retrato',
    corHex: '#c084fc',
  },
  paisagem: {
    icone: Mountain,
    texto: 'text-paisagem',
    fundo: 'bg-paisagem/15',
    borda: 'border-paisagem/40',
    barra: 'bg-paisagem',
    corHex: '#2dd4bf',
  },
  manual: {
    icone: SlidersHorizontal,
    texto: 'text-manual',
    fundo: 'bg-manual/15',
    borda: 'border-manual/40',
    barra: 'bg-manual',
    corHex: '#a78bfa',
  },
}

export const ordemModos = ['auto', 'estudo', 'pet', 'retrato', 'paisagem', 'manual']

export const nomesModos = {
  auto: 'Auto',
  estudo: 'Estudo',
  pet: 'Pet',
  retrato: 'Retrato',
  paisagem: 'Paisagem',
  manual: 'Manual',
}

export default estilosModos
