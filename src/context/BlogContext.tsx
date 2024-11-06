import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

interface IBlogContext {
  loading: boolean;
  errors: AxiosError | null;
  blogs: IBlog[];
}

const BlogContext = createContext<IBlogContext>({
  loading: true,
  errors: null,
  blogs: [],
});

function BlogProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("blogs");
  useEffect(() => {
    if (searchParams.get("category")) {
      setQuery(() => "blogs/?category=" + searchParams.get("category"));
    }
  }, [searchParams]);

  const { data: blogs, errors, loading } = useFetch<IBlog>(query);

  return (
    <BlogContext.Provider value={{ blogs, errors, loading }}>
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext, BlogProvider };
