import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useRolarParaHash(pronto) {
  const location = useLocation()

  useEffect(() => {
    if (!pronto || !location.hash) return
    const elemento = document.getElementById(location.hash.slice(1))
    if (elemento) elemento.scrollIntoView()
  }, [pronto, location.hash, location.key])
}
