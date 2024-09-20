import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextoApi } from "../App";

const Navbar = () => {
  const { isLoged, cerrarSesion } = useContext(ContextoApi);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img 
            src="https://w7.pngwing.com/pngs/452/495/png-transparent-react-javascript-angularjs-ionic-github-text-logo-symmetry-thumbnail.png" 
            alt="Logo" 
            width="40" 
            height="40" 
            className="d-inline-block align-text-top" 
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {isLoged && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes/crear">Registrar</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isLoged ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={cerrarSesion}>Cerrar Sesión</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/register">Registrar</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
