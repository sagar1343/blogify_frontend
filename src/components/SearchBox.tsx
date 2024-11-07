import { useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate("/blogs/?search=" + inputRef.current?.value);
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex items-center gap-2 min-w-96"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="grow rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
      />
      <button type="submit" className="btn btn-primary btn-circle">
        <IoSearchOutline fontSize={20} />
      </button>
    </form>
  );
}

export default SearchBox;
