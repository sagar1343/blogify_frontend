import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface UseFetchReturn<T> {
  loading: boolean;
  errors: AxiosError | null;
  data: T[];
  count: number;
}

function useFetch<T>(endpoint: string): UseFetchReturn<T> {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/${endpoint}`)
      .then((res) => {
        setData(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => setErrors(err))
      .finally(() => setLoading(false));

    return () => {
      setErrors(null);
      setData([]);
    };
  }, [endpoint]);

  return { loading, errors, data, count };
}

export default useFetch;
