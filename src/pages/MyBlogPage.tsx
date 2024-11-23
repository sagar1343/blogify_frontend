import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BlogTable from "../components/BlogTable";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function MyBlogPage() {
  const { user } = useAuth();
  const { data } = useFetch<IBlog[]>("/blogs?author=" + user?.id);
  const [chart, setChart] = useState<{ title: string; reads: number }[]>([]);
  useEffect(() => {
    if (!data) return;
    setChart(data.map((blog) => ({ title: blog.title, reads: blog.read_by })));
  }, [data]);
  console.log(chart);
  return (
    <div className="mt-5 space-y-10">
      <div className="flex space-x-3">
        <div className="border">
          <div className="flex flex-col mx-7 my-4">
            <p className="text-xs text-gray-400 text-center">Total Post</p>{" "}
            <span className="text-2xl font-semibold">{data?.length}</span>
          </div>
        </div>
        <div className="border">
          <div className="flex flex-col mx-7 my-4">
            <p className="text-xs text-gray-400 text-center">Total Reads</p>{" "}
            <span className="text-2xl font-semibold">
              {data?.reduce((acc, blog) => acc + blog.read_by, 0) || 0}
            </span>
          </div>
        </div>
      </div>
      {chart.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chart}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis hide dataKey="title" stroke="#2563eb" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="reads" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div>{data && <BlogTable blogs={data} />}</div>
    </div>
  );
}

export default MyBlogPage;
