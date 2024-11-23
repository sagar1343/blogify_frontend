import BlogTable from "../components/BlogTable";
import Loader from "../components/Loader";
import Order from "../components/Order";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import { useBlog } from "../context/BlogContext";

function HomePage(): React.JSX.Element {
  const { blogs, errors, loading, count } = useBlog();
  const totalPage = Math.ceil(count / 10);
  const { filters, setFilters } = useBlog();
  const page = filters.page ?? 1;

  const updatePageNumber = (value: number) =>
    setFilters((prev) => ({ ...prev, page: value }));

  if (errors) return <p>{errors.message}</p>;
  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex gap-4 flex-wrap-reverse justify-between items-center mt-4 mb-8">
        <Order />
        <SearchBox />
      </div>
      {blogs && <BlogTable blogs={blogs} />}
      {totalPage > 1 && (
        <div className="flex my-10 justify-center">
          <Pagination
            totalPage={totalPage}
            page={page}
            updatePageNumber={updatePageNumber}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
