import { useState, useEffect, useRef } from 'react'

// mostra o conteúdo subindo quando ele aparece na tela (só classes do Tailwind)
export default function Revelar({ children, atraso = 0, className = '' }) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observador.observe(ref.current)
    return () => observador.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${atraso}ms` }}
      className={`transition duration-700 ease-out motion-reduce:transition-none ${
        visivel ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
