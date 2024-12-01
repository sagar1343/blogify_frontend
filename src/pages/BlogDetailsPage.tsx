import { FaEye } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Loader from "../components/Loader";
import { useBlog } from "../context/BlogContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function BlogDetailsPage() {
  const { id } = useParams();
  const { setFilters } = useBlog();
  const { data: blog, loading } = useFetch<IBlog>("/blogs/" + id);
  if (loading) return <Loader />;
  return (
    <>
      {blog && (
        <div className="card w-full bg-base-100">
          <div className="card-body">
            <h1 className="text-5xl capitalize font-extrabold mb-2">
              {blog.title}
            </h1>
            <p>{blog.description}</p>
            <div className="flex justify-between border-b border-base-300">
              <div className="mb-6">
                <span className="badge badge-primary">
                  {blog.category.title}
                </span>
                <div className="ml-3 text-sm text-gray-500 inline-flex items-center gap-1">
                  <span>{blog.read_by}</span>
                  <FaEye className="inline" />
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Link
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, author: blog.author.id }))
                  }
                  to={`/blogs/?author=${blog.author.id}`}
                  className="font-medium text-primary"
                >
                  {blog.author.email}
                </Link>
                <span className="mx-2">•</span>
                <span>{new Date(blog.date).toDateString()}</span>
              </div>
            </div>
            <section className="space-y-8 my-6">
              <ReactMarkdown className="prose">{blog.content}</ReactMarkdown>
            </section>
          </div>
        </div>
      )}
      {blog && <Comments blogId={blog.id} />}
    </>
  );
}

export default BlogDetailsPage;
