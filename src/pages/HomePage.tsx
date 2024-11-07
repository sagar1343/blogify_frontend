import { useContext } from "react";
import BlogTable from "../components/BlogTable";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { BlogContext } from "../context/BlogContext";
import SearchBox from "../components/SearchBox";
import Order from "../components/Order";

function HomePage(): React.JSX.Element {
  const { blogs, errors, loading, count } = useContext(BlogContext);
  if (errors) return <p>{errors.message}</p>;
  const totalPage = Math.ceil(count / 10);

  return loading ? (
    <Loader fullPage={false} />
  ) : (
    <>
      <div className="flex items-center justify-between my-4">
        <SearchBox />
        <Order />
      </div>
      {blogs && <BlogTable />}
      {totalPage > 1 && (
        <div className="flex justify-center">
          <Pagination totalPage={totalPage} />
        </div>
      )}
    </>
  );
}

export default HomePage;
