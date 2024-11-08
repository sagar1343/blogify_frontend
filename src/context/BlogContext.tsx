import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

interface IBlogContext {
  loading: boolean;
  errors: AxiosError | null;
  blogs: IBlog[] | null;
  count: number;
  page: number;
  order: string;
  setPage: (prev: number) => void;
  setOrder: (prev: string) => void;
}

export const BlogContext = createContext<IBlogContext>({
  loading: true,
  errors: null,
  blogs: [],
  count: 0,
  page: 1,
  order: "",
  setPage: () => {},
  setOrder: () => {},
});

export function BlogProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { id: blogId } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [query, setQuery] = useState("blogs");
  const { data: blogs, errors, loading, count } = useFetch<IBlog[]>(query);
  const category = searchParams.get("category");
  const author = searchParams.get("author");
  const search = searchParams.get("search");

  useEffect(
    () => updateURLAndQuery(),
    [search, blogId, category, author, order, page]
  );
  useEffect(() => setPage(1), [category, author]);

  function updateURLAndQuery(): void {
    if (search) {
      setQuery("/blogs/?search=" + search);
      return;
    }
    if (blogId) return;
    const params: string[] = [];
    if (category) params.push("category=" + category);
    if (author) params.push("author=" + author);
    if (order) params.push("ordering=" + order);
    params.push("page=" + page);
    const queryString = "/blogs/?" + params.join("&");
    navigate(queryString);
    setQuery(queryString);
  }

  return (
    <BlogContext.Provider
      value={{ blogs, errors, loading, count, page, setPage, order, setOrder }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
