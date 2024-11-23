import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useBlog } from "../context/BlogContext";

function Pagination({ totalPage }: { totalPage: number }) {
  const { filters, setFilters } = useBlog();
  const page = filters.page ?? 1;
  const updatePageNumber = (value: number) =>
    setFilters((prev) => ({ ...prev, page: value }));

  return (
    <div className="">
      <button
        disabled={page <= 1}
        onClick={() => updatePageNumber(Math.max(page - 1, 1))}
        className="btn btn-square btn-sm btn-ghost"
      >
        <FaChevronLeft />
      </button>
      <button className="font-medium text-sm cursor-default px-3">
        Page {page} of {totalPage}
      </button>
      <button
        disabled={page >= totalPage}
        onClick={() => updatePageNumber(Math.min(page + 1, totalPage))}
        className="btn btn-square btn-sm btn-ghost"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
