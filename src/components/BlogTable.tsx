import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

function BlogTable() {
  const { blogs } = useContext(BlogContext);
  const navigate = useNavigate();
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
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
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
