import { Link } from "react-router-dom";
import { ICategory } from "../types/ICategory";

function Sidebar({ categories }: { categories: ICategory[] }) {
  return (
    <aside className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        {categories.map((item) => (
          <li key={item.id}>
            <Link to="/blogs">{item.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
