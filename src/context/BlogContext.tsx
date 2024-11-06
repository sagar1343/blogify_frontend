import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

interface IBlogContext {
  loading: boolean;
  errors: AxiosError | null;
  blogs: IBlog[] | null;
  count: number;
  page: number;
  setPage: (prev: number) => void;
}

const BlogContext = createContext<IBlogContext>({
  loading: true,
  errors: null,
  blogs: [],
  count: 0,
  page: 1,
  setPage: () => {},
});

function BlogProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("blogs");
  const [page, setPage] = useState(1);
  const { data: blogs, errors, loading, count } = useFetch<IBlog[]>(query);
  const category = searchParams.get("category");
  const author = searchParams.get("author");
  const navigate = useNavigate();

  useEffect(() => setPage(1), [category, author]);

  useEffect(() => updateURLAndQuery(), [category, page]);

  function updateURLAndQuery(): void {
    const params: string[] = [];
    if (category) params.push("category=" + category);
    if (author) params.push("author=" + author);
    params.push("page=" + page);
    const queryString = "/blogs/?" + params.join("&");
    navigate(queryString);
    setQuery(queryString);
  }

  return (
    <BlogContext.Provider
      value={{ blogs, errors, loading, count, page, setPage }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext, BlogProvider };
