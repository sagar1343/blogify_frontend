import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

interface IChartData {
  title: string;
  reads: number;
}

function Chart() {
  const { data: blogs, loading } = useFetch<IBlog[]>("/blogs/me");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    if (!blogs) return;
    setChartData(
      blogs.map((blog) => ({ title: blog.title, reads: blog.read_by }))
    );
  }, [blogs]);
  if (loading)
    return (
      <div className="space-y-10 flex flex-col">
        <div className="flex space-x-3">
          <div className="skeleton w-28 h-20" />
          <div className="skeleton w-28 h-20" />
        </div>
        <div className="skeleton h-72 w-full" />
      </div>
    );
  return (
    <div className="space-y-10">
      <div className="flex space-x-3">
        <div className="border rounded-sm">
          <div className="flex flex-col mx-7 my-4">
            <p className="text-xs text-gray-400 text-center">Total Post</p>{" "}
            <span className="text-2xl font-semibold">{chartData?.length}</span>
          </div>
        </div>
        <div className="border rounded-sm">
          <div className="flex flex-col mx-7 my-4">
            <p className="text-xs text-gray-400 text-center">Total Reads</p>{" "}
            <span className="text-2xl font-semibold">
              {blogs?.reduce((acc, blog) => acc + blog.read_by, 0) || 0}
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis hide dataKey="title" stroke="#2563eb" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="reads" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
