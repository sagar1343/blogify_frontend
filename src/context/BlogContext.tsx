import { AxiosError } from "axios";
import queryString from "query-string";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

interface IBlogContext {
  loading: boolean;
  errors: AxiosError | null;
  blogs: IBlog[] | null;
  count: number;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

interface IFilters {
  author?: number;
  category?: number;
  ordering?: string;
  search?: string;
  page?: number;
}

export const BlogContext = createContext<IBlogContext>({
  loading: true,
  errors: null,
  blogs: [],
  count: 0,
  filters: {},
  setFilters: () => {},
});

export function BlogProvider({ children }: { children: ReactNode }) {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState("/blogs");
  const [filters, setFilters] = useState<IFilters>({});
  const { data: blogs, count, errors, loading } = useFetch<IBlog[]>(route);

  useEffect(() => {
    const querystring = queryString.stringify(filters, {
      skipEmptyString: true,
      skipNull: true,
    });
    setRoute("/blogs?" + querystring);
  }, [filters]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.category, filters.author, filters.search]);

  useEffect(() => navigate(route), [route]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        errors,
        loading,
        count,
        filters,
        setFilters,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
