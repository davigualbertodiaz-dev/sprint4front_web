import { useState } from 'react'

const API_PET = 'https://dog.ceo/api/breeds/image/random'

function sortear(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function gerarAjustes() {
  const iso = Math.round(sortear(100, 3200) / 100) * 100
  const exposicao = Math.round((Math.random() * 4 - 2) * 10) / 10
  return { iso, exposicao }
}

export default function useSimuladorCamera(modos, salvarCaptura) {
  const [modo, setModo] = useState('auto')
  const [aviso, setAviso] = useState(null)
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState(null)

  const detectaveis = modos.filter((item) => item.deteccao !== null)

  function trocarModo(novoModo) {
    setModo(novoModo)
    setAviso(null)
    setErro(null)
  }

  async function buscarFotoPet() {
    try {
      const resposta = await fetch(API_PET)
      const json = await resposta.json()
      if (json.status === 'success') return json.message
      throw new Error('API do pet sem foto')
    } catch {
      setErro('Não foi possível buscar a foto do pet agora. A captura foi salva sem imagem.')
      return null
    }
  }

  async function capturar(nomeSessao) {
    setErro(null)
    setProcessando(true)

    let modoFinal = modo

    // no auto sorteia a cena detectada
    if (modo === 'auto' && detectaveis.length > 0) {
      const sorteado = detectaveis[Math.floor(Math.random() * detectaveis.length)]
      modoFinal = sorteado.id
      setAviso({ ...sorteado.deteccao, modo: sorteado.id })
    } else {
      setAviso(null)
    }

    let imagem = null
    if (modoFinal === 'pet') {
      imagem = await buscarFotoPet()
    }

    let sessao = null
    if (modoFinal === 'estudo') {
      sessao = nomeSessao.trim() !== '' ? nomeSessao.trim() : 'Sessão automática'
    }

    salvarCaptura({
      modo: modoFinal,
      viaAuto: modo === 'auto',
      sessao,
      imagem,
      ...gerarAjustes(),
    })

    setProcessando(false)
  }

  return { modo, trocarModo, aviso, processando, erro, capturar }
}
