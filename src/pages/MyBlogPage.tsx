import BlogTable from "../components/BlogTable";
import Chart from "../components/Chart";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function MyBlogPage() {
  const { user } = useAuth();
  const { data } = useFetch<IBlog[]>("/blogs?author=" + user?.id);
  return (
    <div className="mt-5 space-y-10">
      {data && <Chart blogs={data} />}
      <div>{data && <BlogTable blogs={data} editable />}</div>
    </div>
  );
}

export default MyBlogPage;
