import { useState } from "react";

export function useUpdateClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateClient = async (url, clientData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };

  return { updateClient, loading, error };
}
