import { useState } from 'react'
import './App.css'
import { Router, Routes, Route } from 'react-router-dom'
import { useContext, createContext } from 'react'
import Clientes from './components/api'
import Home from './pages/home'
import Navbar from './layout/navbar'
import Error404 from './pages/404'
import CreateClientForm from './components/CreateClientForm'
import Login from './pages/auth/login'
import RegistroCuenta from './pages/auth/register'
import PrivateRoute from './routerPrivate'

export const ContextoApi = createContext()

function App() {
  const [registros, setRegistros] = useState([]) 
  const [isLoged, setIsloged] = useState(false)
  
  
  const manejoRegistros = (registro) =>{
    setRegistros([...registros, registro])
  }
  
  const login = (credentials) =>{
  const user1 = JSON.parse(localStorage.getItem('user'))
  if (credentials.user === user1.usuario && credentials.password === user1.contrasena){
    setIsloged(true)
    alert("sesion iniciada")
  }else{
    alert("contraseña o usuario incorrecto")
  }
}
const cerrarSesion = () =>{
  setIsloged(false)
}



  return (
    <>
    <ContextoApi.Provider value={{login, isLoged, cerrarSesion}}>
    <Navbar/>
    <Routes>
      <Route path='*' element={<Error404/>} />
      <Route path='/login' element={<Login/> }/>
      <Route path='/register' element={<RegistroCuenta/> }/>

      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/clientes' element={<PrivateRoute><Clientes/></PrivateRoute>}/>
      <Route path='/clientes/crear' element={<PrivateRoute><CreateClientForm/></PrivateRoute>} />
    </Routes>
    </ContextoApi.Provider>
    </>
  )
}

export default App
