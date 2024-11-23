import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { api } from "../service/api";
import { IFormData } from "../types/IFormData";

function NewBlogPage() {
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const payload = { ...data, category: data.category.id };
    await api.post("/blogs/", payload);
    navigate("/blogs/me");
    toast.success("Created Successfully");
  };
  return <BlogForm onSubmit={onSubmit} />;
}

export default NewBlogPage;
