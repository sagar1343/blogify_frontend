import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";
import { IBlog } from "../types/IBlog";

interface Props {
  blogs: IBlog[];
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
  editable?: boolean;
}

function BlogTable({ blogs, setBlogs, editable }: Props) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  async function handleDeletePost(id: number) {
    setDeleting(true);
    try {
      await api.delete("/blogs/" + id);
      setBlogs &&
        setBlogs((blogs: IBlog[]) => blogs.filter((blog) => blog.id !== id));
      toast.success("Successfully deleted the post");
    } catch (error) {
      toast.error("Changes are not saved. try again later!");
    } finally {
      setOpenModal(false);
      setDeleting(false);
    }
  }

  if (!blogs?.length)
    return (
      <p className="text-3xl text-center text-zinc-300">
        No blogs yet. Create one to get started!
      </p>
    );

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
          {blogs?.map((blog) => {
            return (
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
                            {blog.author.first_name
                              .charAt(0)
                              .toLocaleUpperCase()}
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
                    <div className="space-x-3">
                      <button
                        className="btn btn-warning btn-xs flex-nowrap"
                        onClick={() => navigate("/blogs/edit/" + blog.id)}
                      >
                        <FaPencil /> Edit
                      </button>
                      <button
                        onClick={() => setOpenModal(true)}
                        className="btn btn-error btn-xs flex-nowrap"
                      >
                        <FaTrashAlt /> Delete
                      </button>

                      <dialog
                        className={`modal ${isOpenModal ? "modal-open" : ""}`}
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Confirmation Required
                          </h3>
                          <p className="py-4">
                            Are you sure you want to delete this post? This
                            action cannot be undone.
                          </p>
                          <div className="modal-action">
                            <button
                              disabled={isDeleting}
                              onClick={() => setOpenModal(false)}
                              className="btn"
                            >
                              Close
                            </button>
                            <button
                              disabled={isDeleting}
                              onClick={() => handleDeletePost(blog.id)}
                              className="btn btn-error"
                            >
                              Confirm Delete
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BlogTable;
