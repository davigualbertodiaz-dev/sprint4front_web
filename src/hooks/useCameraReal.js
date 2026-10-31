import { useState, useRef, useEffect } from 'react'

export default function useCameraReal() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [ligada, setLigada] = useState(false)
  const [erro, setErro] = useState(null)

  async function ligar() {
    setErro(null)

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErro('Este navegador não libera a câmera aqui. Abra o site pelo link da Vercel (HTTPS) ou pelo localhost.')
      return
    }

    try {
      // environment = câmera traseira no celular (no notebook usa a webcam normal)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setLigada(true)
    } catch (e) {
      if (e.name === 'NotAllowedError') {
        setErro('Acesso à câmera negado. Libere a permissão no cadeado da barra de endereço e tente de novo.')
      } else if (e.name === 'NotFoundError') {
        setErro('Nenhuma câmera encontrada neste aparelho.')
      } else {
        setErro('Não foi possível ligar a câmera. Feche outros apps que estejam usando a câmera e tente de novo.')
      }
    }
  }

  function desligar() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setLigada(false)
  }

  // desliga a câmera quando sai da página
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // desenha o quadro atual do vídeo num canvas e devolve como imagem jpg
  function tirarFoto() {
    const video = videoRef.current
    if (!ligada || !video || video.videoWidth === 0) return null

    const largura = 400
    const altura = Math.round(video.videoHeight * (largura / video.videoWidth))
    const canvas = document.createElement('canvas')
    canvas.width = largura
    canvas.height = altura
    canvas.getContext('2d').drawImage(video, 0, 0, largura, altura)
    return canvas.toDataURL('image/jpeg', 0.7)
  }

  return { videoRef, ligada, erro, ligar, desligar, tirarFoto }
}
