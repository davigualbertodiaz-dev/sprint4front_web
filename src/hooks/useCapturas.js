import useLocalStorage from './useLocalStorage'
import { ordemModos } from '../data/estilosModos'

export default function useCapturas() {
  const [capturas, setCapturas] = useLocalStorage('lensflow:capturas', [])

  function adicionar(nova) {
    const captura = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      data: new Date().toISOString(),
      ...nova,
    }
    setCapturas((lista) => [captura, ...lista])
  }

  function remover(id) {
    setCapturas((lista) => lista.filter((captura) => captura.id !== id))
  }

  function limpar() {
    setCapturas([])
  }

  // estatísticas
  const total = capturas.length

  const porModo = ordemModos.map((modo) => {
    const quantidade = capturas.filter((captura) => captura.modo === modo).length
    const porcentagem = total === 0 ? 0 : Math.round((quantidade / total) * 100)
    return { modo, quantidade, porcentagem }
  })

  const viaAuto = capturas.filter((captura) => captura.viaAuto).length
  const porcentagemAuto = total === 0 ? 0 : Math.round((viaAuto / total) * 100)

  let maisUsado = null
  for (const item of porModo) {
    if (item.quantidade > 0 && (maisUsado === null || item.quantidade > maisUsado.quantidade)) {
      maisUsado = item
    }
  }

  return { capturas, adicionar, remover, limpar, total, porModo, porcentagemAuto, maisUsado }
}
