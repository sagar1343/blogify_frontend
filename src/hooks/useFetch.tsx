import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface UseFetchReturn<T> {
  loading: boolean;
  errors: AxiosError | null;
  data: T | null;
  count: number;
}

function useFetch<T>(endpoint: string): UseFetchReturn<T> {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<AxiosError | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/${endpoint}`)
      .then((res) => {
        setData(res.data.results ?? res.data);
        setCount(res.data.count);
      })
      .catch((err) => setErrors(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { loading, errors, data, count };
}

export default useFetch;
