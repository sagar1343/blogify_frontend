import { useContext } from "react";
import BlogTable from "../components/BlogTable";
import Loader from "../components/Loader";
import { BlogContext } from "../context/BlogContext";

function HomePage(): React.JSX.Element {
  const { blogs, errors, loading } = useContext(BlogContext);
  if (errors) return <p>{errors.message}</p>;

  return loading ? <Loader fullPage={false} /> : <BlogTable blogs={blogs} />;
}

export default HomePage;
