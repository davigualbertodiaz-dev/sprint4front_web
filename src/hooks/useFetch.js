import { useState, useEffect } from 'react'

export default function useFetch(url) {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    // evita setState depois que o componente desmonta
    let ativo = true

    async function buscar() {
      setCarregando(true)
      setErro(null)
      try {
        const resposta = await fetch(url)
        if (!resposta.ok) {
          throw new Error('Resposta inválida: ' + resposta.status)
        }
        const json = await resposta.json()
        if (ativo) setDados(json)
      } catch {
        if (ativo) setErro('Não foi possível carregar os dados. Verifique sua conexão e recarregue a página.')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    buscar()

    return () => {
      ativo = false
    }
  }, [url])

  return { dados, carregando, erro }
}
