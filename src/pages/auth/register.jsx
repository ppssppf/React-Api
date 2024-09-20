import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroCuenta = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errors, setErrors] = useState({ usuario: false, contrasena: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!usuario || !contrasena) {
      setErrors({
        usuario: !usuario,
        contrasena: !contrasena,
      });
      return;
    }

    localStorage.setItem("user", JSON.stringify({ usuario, contrasena }));
    navigate('/login', { replace: true });
    setContrasena('');
    setUsuario('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border border-secondary rounded p-4 shadow-sm">
          <h2 className="mb-5 text-center">Registro de Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                id="usuario"
                placeholder="Introduce tu usuario"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (errors.usuario && e.target.value) setErrors((prev) => ({ ...prev, usuario: false }));
                }}
              />
              {errors.usuario && <div className="invalid-feedback">El campo usuario es requerido.</div>}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`}
                id="contrasena"
                placeholder="Introduce tu contraseña"
                value={contrasena}
                onChange={(e) => {
                  setContrasena(e.target.value);
                  if (errors.contrasena && e.target.value) setErrors((prev) => ({ ...prev, contrasena: false }));
                }}
              />
              {errors.contrasena && <div className="invalid-feedback">El campo contraseña es requerido.</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroCuenta;
