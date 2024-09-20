import React from "react";
import { Link } from "react-router-dom";

const Error404 = () =>{
    return(
        <>
         <div className="container mt-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Volver a la Página Principal
      </Link>
    </div>
        </>
    )
}
export default Error404