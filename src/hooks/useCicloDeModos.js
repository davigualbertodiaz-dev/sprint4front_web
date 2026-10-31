import { useState, useEffect } from 'react'

export default function useCicloDeModos(lista, intervalo, ativo) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!ativo || reduzirMovimento || lista.length === 0) return

    const timer = setInterval(() => {
      setIndice((anterior) => (anterior + 1) % lista.length)
    }, intervalo)

    return () => clearInterval(timer)
  }, [lista.length, intervalo, ativo])

  if (lista.length === 0) return null
  return lista[indice % lista.length]
}
