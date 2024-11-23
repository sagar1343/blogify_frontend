import BlogTable from "../components/BlogTable";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function MyBlogPage() {
  const { user } = useAuth();
  const { data, loading } = useFetch<IBlog[]>("/blogs?author=" + user?.id);
  if (loading) return <Loader fullPage={false} />;
  return (
    <div className="mt-5 space-y-10">
      {data && data?.length > 0 && <Chart blogs={data} />}
      <div>{data && <BlogTable blogs={data} editable />}</div>
    </div>
  );
}

export default MyBlogPage;
