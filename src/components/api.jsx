import React, { useState, useContext } from "react";
import { GetAllFetch } from "./hooks/userFetchet";
import { useUpdateClient } from "./hooks/updateClientFetch";
import { useDeleteClient } from "./hooks/deleteClientFetch"; 
import { Spinner } from "react-bootstrap"; // Importando Spinner para el ícono de carga

const Usuarios = () => {
  const { dataApi, loading, error, refetch } = GetAllFetch('https://banco-m3sn.onrender.com/api/cliente');
  const { updateClient, loading: updating, error: updateError } = useUpdateClient();
  const { deleteClient, loading: deleting, error: deleteError } = useDeleteClient();
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClientId, setDeletingClientId] = useState(null); // estado para el cliente específico
  
  const [formData, setFormData] = useState({
    documentoCliente: "",
    nombreCompleto: "",
    celular: "",
    fechaNacimiento: ""
  });

  const handleEdit = (client) => {
    setEditingClient(client._id);
    setFormData({ ...client, fechaNacimiento: new Date(client.fechaNacimiento).toISOString().split('T')[0] });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://banco-m3sn.onrender.com/api/cliente/${formData.documentoCliente}`;

    const result = await updateClient(url, formData);
    if (result) {
      alert("Cliente actualizado con éxito");
      setEditingClient(null); // Deja de editar tras la actualización
      refetch(); // Refetch después de actualizar el cliente
    }
  };

  const handleDelete = async (documentoCliente) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (!confirmDelete) return;

    setDeletingClientId(documentoCliente); // Establecer el ID del cliente que se está eliminando

    const url = `https://banco-m3sn.onrender.com/api/cliente/${documentoCliente}`;
    const result = await deleteClient(url);

    if (result) {
      alert("Cliente eliminado con éxito");
      setDeletingClientId(null); // Resetear el estado del cliente que se está eliminando
      refetch(); // Refetch después de eliminar el cliente
    }
  };

  return (
    <div className="container mt-4">
      {error && <p className="text-danger">Error al cargar los servicios: {error.message}</p>}
      <h1 className="mb-4">Usuarios</h1>
      <p className="lead">
          En este pagina se pueden editar los clientes del Banco.
        </p>
        <hr className="my-4" />

      <div className="row">
        {Array.isArray(dataApi) && dataApi.map((element) => (
          <div className="col-md-4 mb-3" key={element._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{element.nombreCompleto}</h5>
                <p className="card-text">
                  <strong>Documento:</strong> {element.documentoCliente}<br />
                  <strong>Celular:</strong> {element.celular}<br />
                  <strong>Fecha de Nacimiento:</strong> {new Date(element.fechaNacimiento).toLocaleDateString()}
                </p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(element)}>Editar</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(element.documentoCliente)}
                  disabled={deletingClientId === element.documentoCliente} // Deshabilitar solo el botón del cliente en eliminación
                >
                  {deletingClientId === element.documentoCliente ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Eliminando...</span>
                    </>
                  ) : "Eliminar"}
                </button>

                {editingClient === element._id && (
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                      <label className="form-label">Nombre Completo:</label>
                      <input
                        type="text"
                        name="nombreCompleto"
                        className="form-control"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Celular:</label>
                      <input
                        type="text"
                        name="celular"
                        className="form-control"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        className="form-control"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={updating}>
                      {updating ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span className="ms-2">Actualizando...</span>
                        </>
                      ) : "Actualizar"}
                    </button>
                    {updateError && <p className="text-danger">Error al actualizar: {updateError.message}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteError && <p className="text-danger">Error al eliminar: {deleteError.message}</p>}

      {/* Icono de carga en la esquina inferior derecha */}
      {loading && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
