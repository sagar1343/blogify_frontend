import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import { api } from "../service/api";
import { IBlog } from "../types/IBlog";
import { IFormData } from "../types/IFormData";

function EditBlogPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useFetch<IBlog>("/blogs/" + id);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const payload = { ...data, category: data.category.id };
    await api.patch(`/blogs/${id}`, payload);
    navigate("/blogs/me");
    toast.success("Updated Successfully");
  };

  if (loading && !data) return <Loader />;
  return <BlogForm onSubmit={onSubmit} defaultValues={data!} />;
}

export default EditBlogPage;
