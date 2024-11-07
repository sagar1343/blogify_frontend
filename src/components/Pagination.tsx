import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

function Pagination({ totalPage }: { totalPage: number }) {
  const { page, setPage } = useContext(BlogContext);

  return (
    <div className="join">
      <button
        disabled={page <= 1}
        onClick={() => setPage(Math.max(page - 1, 1))}
        className="join-item btn btn-ghost"
      >
        Prev
      </button>
      <button className="join-item font-medium text-sm cursor-default px-3">
        Page {page} of {totalPage}
      </button>
      <button
        disabled={page >= totalPage}
        onClick={() => setPage(Math.min(page + 1, totalPage))}
        className="join-item btn btn-ghost"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
