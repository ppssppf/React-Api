import { useContext } from 'react'
import { ContextoApi } from './App'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isLoged } = useContext(ContextoApi)

  return isLoged ? children : <Navigate to="/login" />
}

export default PrivateRoute
