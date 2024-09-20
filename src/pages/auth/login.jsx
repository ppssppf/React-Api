import { useContext, useState } from 'react';
import { ContextoApi } from '../../App';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(ContextoApi);
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = () => {
    login(credentials);
    navigate('/'); // Cambiar a la ruta deseada después de iniciar sesión
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border border-secondary rounded p-4 shadow-sm">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <div className="form-group mb-3">
            <label htmlFor="user">Usuario</label>
            <input 
              type="text" 
              className="form-control" 
              id="user" 
              placeholder="Ingrese su usuario" 
              value={credentials.user} 
              onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Ingrese su contraseña" 
              value={credentials.password} 
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Ingresar
          </button>
          <div className="mt-3 text-center">
            <Link className="nav-link" to="/register">¿No tienes cuenta? Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
