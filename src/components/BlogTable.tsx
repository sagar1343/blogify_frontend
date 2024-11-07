import { useNavigate } from "react-router-dom";
import { IBlog } from "../types/IBlog";

function BlogTable({ blogs }: { blogs: IBlog[] }) {
  const navigate = useNavigate();
  if (!blogs?.length) return <p>No Results Found.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>
                <div className="flex items-center gap-3">
                  {blog.author.profile_picture_url ? (
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={blog.author.profile_picture_url} />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-neutral mask mask-squircle h-12 w-12">
                        <span className="text-3xl text-white">
                          {blog.author.first_name.charAt(0).toLocaleUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-bold">{blog.title}</div>
                    <div className="text-sm opacity-50">
                      {blog.author.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden sm:block max-w-screen-md">
                <p className="line-clamp-4">{blog.description}</p>
                <br />
                <span className="badge badge-primary badge-sm">
                  {blog.category.title}
                </span>
              </td>
              <td>{new Date(blog.date).toDateString()}</td>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => navigate("/blogs/" + blog.id)}
                >
                  details
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BlogTable;
