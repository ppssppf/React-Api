import { useEffect, useState } from "react";

export function GetAllFetch(url) {
  const [dataApi, setDataApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setDataApi(data.clientes); // Asegúrate de que la API devuelva 'clientes'
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error); 
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // Llama a fetchData cuando el componente se monta
  }, [url]);

  // Retornamos 'refetch' para que pueda ser llamado desde el componente cuando sea necesario
  const refetch = () => {
    fetchData();
  };

  return { dataApi, loading, error, refetch };
}
