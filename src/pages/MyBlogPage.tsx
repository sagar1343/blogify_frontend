import { useEffect, useState } from "react";
import BlogTable from "../components/BlogTable";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function MyBlogPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const query = `/blogs?author=${user?.id}&page=${page}`;
  const { data, loading, count } = useFetch<IBlog[]>(query);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    data && setBlogs(data);
  }, [data]);

  if (loading) return <Loader />;
  return (
    <div className="mt-5 space-y-10">
      {blogs && blogs.length > 0 && <Chart />}
      <div>
        {blogs && <BlogTable editable blogs={blogs} setBlogs={setBlogs} />}
      </div>
      {page > 1 && (
        <div className="flex my-10 justify-center">
          <Pagination
            totalPage={Math.ceil(count / 10)}
            page={page}
            updatePageNumber={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default MyBlogPage;
