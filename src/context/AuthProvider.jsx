import AuthContext from './AuthContext'
import useLocalStorage from '../hooks/useLocalStorage'
import usuarios from '../data/usuarios'

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useLocalStorage('lensflow:usuario', null)

  function entrar(login, senha) {
    const encontrado = usuarios.find(
      (item) => item.usuario === login.trim().toLowerCase() && item.senha === senha,
    )
    if (!encontrado) return false
    setUsuario({ usuario: encontrado.usuario, nome: encontrado.nome })
    return true
  }

  function sair() {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}
