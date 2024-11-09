import { useBlog } from "../context/BlogContext";

function Pagination({ totalPage }: { totalPage: number }) {
  const { filters, setFilters } = useBlog();
  const page = filters.page ?? 1;
  const updatePageNumber = (value: number) =>
    setFilters((prev) => ({ ...prev, page: value }));

  return (
    <div className="join">
      <button
        disabled={page <= 1}
        onClick={() => updatePageNumber(Math.max(page - 1, 1))}
        className="join-item btn btn-ghost"
      >
        Prev
      </button>
      <button className="join-item font-medium text-sm cursor-default px-3">
        Page {page} of {totalPage}
      </button>
      <button
        disabled={page >= totalPage}
        onClick={() => updatePageNumber(Math.min(page + 1, totalPage))}
        className="join-item btn btn-ghost"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
