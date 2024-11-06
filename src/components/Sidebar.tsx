import { Link } from "react-router-dom";
import { ICategory } from "../types/ICategory";

function Sidebar({ categories }: { categories: ICategory[] }) {
  return (
    <aside className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        <li>
          <Link to="/blogs/">
            All Categories{" "}
            <span className="badge badge-sm badge-primary">
              {calculateTotalBlog(categories)}
            </span>
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item.id}>
            <Link to={`/blogs/?category=${item.id}`}>
              {item.title}
              <span className="badge badge-sm badge-primary">
                {item.blog_count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

function calculateTotalBlog(categories: ICategory[]): number {
  return categories.reduce((total, category) => total + category.blog_count, 0);
}
