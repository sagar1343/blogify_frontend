import { FaEye } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";

function BlogDetailsPage() {
  const { id } = useParams();
  const { data: blog, loading } = useFetch<IBlog>("/blogs/" + id);
  if (loading) return <Loader fullPage={false} />;

  return (
    <>
      {blog && (
        <div className="card w-full bg-base-100">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-6xl font-extrabold mb-2">{blog.title}</h1>
            </div>

            <div className="flex justify-between">
              <div className="mb-6">
                <span className="badge badge-secondary badge-lg">
                  {blog.category.title}
                </span>
                <div className="ml-3 text-sm text-gray-500 inline-flex items-center gap-1">
                  <span>{blog.read_by}</span>
                  <FaEye className="inline" />
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Link
                  to={`/blogs/?author=${blog.author.id}`}
                  className="font-medium text-secondary"
                >
                  {blog.author.email}
                </Link>
                <span className="mx-2">•</span>
                <span>{new Date(blog.date).toDateString()}</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-accent mb-2">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {blog.description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-accent mb-2">
                  Full Content
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogDetailsPage;
