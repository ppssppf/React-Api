import { useState } from "react";

export function useDeleteClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteClient = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return { deleteClient, loading, error };
}
