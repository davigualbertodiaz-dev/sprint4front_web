import { useState, useEffect } from 'react'

// descobre qual seção da home está no meio da tela
export default function useSecaoAtiva(ids, ligado) {
  const [ativa, setAtiva] = useState(ids[0])

  useEffect(() => {
    if (!ligado) return

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setAtiva(entrada.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const elemento = document.getElementById(id)
      if (elemento) observador.observe(elemento)
    })

    return () => observador.disconnect()
  }, [ids, ligado])

  return ligado ? ativa : null
}
