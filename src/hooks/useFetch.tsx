import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface UseFetchReturn<T> {
  loading: boolean;
  errors: AxiosError | null;
  data: T[];
}

function useFetch<T>(endpoint: string): UseFetchReturn<T> {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/${endpoint}`)
      .then((res) => setData(res.data.results))
      .catch((err) => setErrors(err))
      .finally(() => setLoading(false));

    return () => {
      setErrors(null);
      setData([]);
    };
  }, [endpoint]);

  return { loading, errors, data };
}

export default useFetch;
