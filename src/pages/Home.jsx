import useFetch from '../hooks/useFetch'
import useRolarParaHash from '../hooks/useRolarParaHash'
import Hero from '../components/home/Hero'
import Solucao from '../components/home/Solucao'
import PublicoAlvo from '../components/home/PublicoAlvo'
import FaixaModos from '../components/home/FaixaModos'
import Modos from '../components/home/Modos'
import Galeria from '../components/home/Galeria'
import Configuracoes from '../components/home/Configuracoes'
import Equipe from '../components/home/Equipe'
import Chamada from '../components/home/Chamada'
import Contato from '../components/home/Contato'

// página inicial: busca os dados na API mockada e repassa para as seções via props
export default function Home() {
  const modosApi = useFetch('/api/modos.json')
  const equipeApi = useFetch('/api/equipe.json')

  // enquanto não chega resposta, usa lista vazia para o .map() não quebrar
  const modos = modosApi.dados || []
  const equipe = equipeApi.dados || []

  useRolarParaHash(!modosApi.carregando && !equipeApi.carregando)

  return (
    <>
      <Hero modos={modos} />
      <Solucao />
      <PublicoAlvo />
      <FaixaModos />
      <Modos modos={modos} carregando={modosApi.carregando} erro={modosApi.erro} />
      <Galeria />
      <Configuracoes />
      <Equipe equipe={equipe} carregando={equipeApi.carregando} erro={equipeApi.erro} />
      <Chamada />
      <Contato equipe={equipe} />
    </>
  )
}
