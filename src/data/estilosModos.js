import { Sparkles, FileText, PawPrint, User, Mountain, SlidersHorizontal } from 'lucide-react'

// classes completas aqui porque o Tailwind não gera classe montada com template string
const estilosModos = {
  auto: {
    icone: Sparkles,
    texto: 'text-orange-400',
    fundo: 'bg-orange-500/10',
    borda: 'border-orange-500/30',
    barra: 'bg-orange-500',
    corHex: '#f97316',
  },
  estudo: {
    icone: FileText,
    texto: 'text-blue-400',
    fundo: 'bg-blue-500/10',
    borda: 'border-blue-500/30',
    barra: 'bg-blue-500',
    corHex: '#3b82f6',
  },
  pet: {
    icone: PawPrint,
    texto: 'text-green-400',
    fundo: 'bg-green-500/10',
    borda: 'border-green-500/30',
    barra: 'bg-green-500',
    corHex: '#22c55e',
  },
  retrato: {
    icone: User,
    texto: 'text-purple-400',
    fundo: 'bg-purple-500/10',
    borda: 'border-purple-500/30',
    barra: 'bg-purple-500',
    corHex: '#a855f7',
  },
  paisagem: {
    icone: Mountain,
    texto: 'text-teal-400',
    fundo: 'bg-teal-500/10',
    borda: 'border-teal-500/30',
    barra: 'bg-teal-500',
    corHex: '#14b8a6',
  },
  manual: {
    icone: SlidersHorizontal,
    texto: 'text-indigo-400',
    fundo: 'bg-indigo-500/10',
    borda: 'border-indigo-500/30',
    barra: 'bg-indigo-500',
    corHex: '#6366f1',
  },
}

// ordem dos modos na barra da câmera (igual ao protótipo)
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
