import { useState, useEffect } from 'react'

// passa para o próximo item da lista a cada "intervalo" milissegundos
export default function useCicloDeModos(lista, intervalo) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (lista.length === 0) return

    const timer = setInterval(() => {
      // o % faz o índice voltar para 0 depois do último item
      setIndice((anterior) => (anterior + 1) % lista.length)
    }, intervalo)

    return () => clearInterval(timer)
  }, [lista.length, intervalo])

  if (lista.length === 0) return null
  return lista[indice % lista.length]
}
