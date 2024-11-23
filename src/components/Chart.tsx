import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { IBlog } from "../types/IBlog";

interface Props {
  blogs: IBlog[];
}

function Chart({ blogs }: Props) {
  const [chartData, setChartData] = useState<
    { title: string; reads: number }[]
  >([]);
  useEffect(() => {
    setChartData(
      blogs.map((blog) => ({ title: blog.title, reads: blog.read_by }))
    );
  }, [blogs]);

  return (
    <div className="space-y-10">
      <div className="flex space-x-3">
        <div className="border">
          <div className="flex flex-col mx-7 my-4">
            <p className="text-xs text-gray-400 text-center">Total Post</p>{" "}
            <span className="text-2xl font-semibold">{chartData?.length}</span>
          </div>
        </div>
        <div className="border">
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
