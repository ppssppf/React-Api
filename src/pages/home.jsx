import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="display-4">Bienvenido a Mi Banco</h1>
        <p className="lead">
          En este pagina se pueden manipular los clientes del Banco.
        </p>
        <hr className="my-4" />
        <p>
          Usa los enlaces de navegación para explorar diferentes secciones de este sitio .
        </p>
        
        {/* Botón para Registrar Clientes */}
        <Link className="btn btn-primary btn-lg m-2" to="/clientes/crear" role="button">
          Registrar Clientes
        </Link>
        
        {/* Botón para Ver Clientes */}
        <Link className="btn btn-secondary btn-lg m-2" to="/clientes" role="button">
          Ver Clientes
        </Link>
      </div>
    </>
  );
};

export default Home;
