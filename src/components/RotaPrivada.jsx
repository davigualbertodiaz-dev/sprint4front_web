import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function RotaPrivada({ children }) {
  const { usuario } = useAuth()
  const location = useLocation()

  // sem login volta pro /login
  if (!usuario) {
    return <Navigate to="/login" replace state={{ origem: location.pathname }} />
  }

  return children
}
