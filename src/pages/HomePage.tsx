import { useContext } from "react";
import BlogTable from "../components/BlogTable";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { BlogContext } from "../context/BlogContext";

function HomePage(): React.JSX.Element {
  const { blogs, errors, loading, count } = useContext(BlogContext);
  if (errors) return <p>{errors.message}</p>;

  return loading ? (
    <Loader fullPage={false} />
  ) : (
    <>
      <BlogTable blogs={blogs} />
      <div className="flex justify-center">
        <Pagination totalPage={Math.ceil(count / 10)} />
      </div>
    </>
  );
}

export default HomePage;
