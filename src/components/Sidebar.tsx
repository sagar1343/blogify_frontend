import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { ICategory } from "../types/ICategory";

function Sidebar({ categories }: { categories: ICategory[] | null }) {
  const { setFilters } = useBlog();

  const updateCategory = (categoryId: number) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  return (
    <aside className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        <li>
          <Link to="/blogs/">
            All Categories
            <span className="badge badge-sm badge-primary">
              {calculateTotalBlog(categories)}
            </span>
          </Link>
        </li>
        {categories?.map((item) => (
          <li key={item.id} onClick={() => updateCategory(item.id)}>
            <div>
              {item.title}
              <span className="badge badge-sm badge-primary">
                {item.blog_count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

function calculateTotalBlog(categories: ICategory[] | null): number {
  return !categories
    ? 0
    : categories?.reduce((total, category) => total + category.blog_count, 0);
}
