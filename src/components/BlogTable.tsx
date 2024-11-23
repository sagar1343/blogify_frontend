import { useNavigate } from "react-router-dom";
import { IBlog } from "../types/IBlog";
import { FaPencil } from "react-icons/fa6";

interface Props {
  blogs: IBlog[];
  editable?: boolean;
}
function BlogTable({ blogs, editable }: Props) {
  const navigate = useNavigate();
  if (!blogs?.length)
    return <p className="text-4xl text-zinc-300">No Results Found :)</p>;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="hidden md:table-cell">Description</th>
            <th className="hidden lg:table-cell">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>
                <div className="flex items-center gap-3 capitalize">
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
                    <div className="text-sm normal-case opacity-50">
                      {blog.author.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell max-w-screen-sm">
                <p className="line-clamp-4">{blog.description}</p>
                <br />
                <span className="badge badge-primary badge-sm">
                  {blog.category.title}
                </span>
              </td>
              <td className="text-nowrap hidden lg:table-cell">
                {new Date(blog.date).toDateString()}
              </td>
              <td>
                {editable ? (
                  <button
                    className="btn btn-warning btn-xs flex-nowrap"
                    onClick={() => navigate("/blogs/edit/" + blog.id)}
                  >
                    <FaPencil /> Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => navigate("/blogs/" + blog.id)}
                  >
                    Details
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BlogTable;
