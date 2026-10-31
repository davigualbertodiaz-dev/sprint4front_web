import useFetch from '../hooks/useFetch'
import useRolarParaHash from '../hooks/useRolarParaHash'
import Hero from '../components/home/Hero'
import Solucao from '../components/home/Solucao'
import PublicoAlvo from '../components/home/PublicoAlvo'
import Modos from '../components/home/Modos'
import Galeria from '../components/home/Galeria'
import Configuracoes from '../components/home/Configuracoes'
import Equipe from '../components/home/Equipe'
import Contato from '../components/home/Contato'

export default function Home() {
  const modosApi = useFetch('/api/modos.json')
  const equipeApi = useFetch('/api/equipe.json')

  const modos = modosApi.dados || []
  const equipe = equipeApi.dados || []

  useRolarParaHash(!modosApi.carregando && !equipeApi.carregando)

  return (
    <>
      <Hero modos={modos} />
      <Solucao />
      <PublicoAlvo />
      <Modos modos={modos} carregando={modosApi.carregando} erro={modosApi.erro} />
      <Galeria />
      <Configuracoes />
      <Equipe equipe={equipe} carregando={equipeApi.carregando} erro={equipeApi.erro} />
      <Contato equipe={equipe} />
    </>
  )
}
