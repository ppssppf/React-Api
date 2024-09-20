import React, { useState } from "react";
import { useCreateClient } from "./hooks/createClientFetch";

const CreateClientForm = () => {
  const { createClient, loading, error } = useCreateClient();

  const [formData, setFormData] = useState({
    documentoCliente: "",
    nombreCompleto: "",
    celular: "",
    fechaNacimiento: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://banco-m3sn.onrender.com/api/cliente";
    
    const result = await createClient(url, formData);
    if (result) {
      alert("Cliente creado con éxito");
      setFormData({
        documentoCliente: "",
        nombreCompleto: "",
        celular: "",
        fechaNacimiento: ""
      });
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registrar Cliente</h1>
      <div className="border border-secondary rounded p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="documentoCliente" className="form-label">Documento:</label>
            <input
              type="text"
              className="form-control"
              id="documentoCliente"
              name="documentoCliente"
              placeholder="Introduce el documento"
              value={formData.documentoCliente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nombreCompleto" className="form-label">Nombre Completo:</label>
            <input
              type="text"
              className="form-control"
              id="nombreCompleto"
              name="nombreCompleto"
              placeholder="Introduce tu nombre completo"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="celular" className="form-label">Celular:</label>
            <input
              type="text"
              className="form-control"
              id="celular"
              name="celular"
              placeholder="Introduce tu celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creando..." : "Registrar"}
          </button>
        </form>
        {error && <p className="text-danger mt-3">Error al crear el cliente: {error.message}</p>}
      </div>
    </div>
  );
};

export default CreateClientForm;
