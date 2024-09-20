import { useState } from "react";

export function useCreateClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createClient = async (url, clientData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Captura del cuerpo del error
        throw new Error(JSON.stringify(errorData)); // Lo lanzamos como error para manejarlo en el frontend
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(JSON.parse(error.message)); // Parseamos el error que lanzamos
    } finally {
      setLoading(false);
    }
  };

  return { createClient, loading, error };
}
