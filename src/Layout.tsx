import { Outlet } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BlogProvider } from "./context/BlogContext";
import useFetch from "./hooks/useFetch";
import { ICategory } from "./types/ICategory";

function Layout() {
  const { loading, errors, data } = useFetch<ICategory[]>("categories/");
  if (errors) return <div>{errors.message}</div>;
  return loading ? (
    <Loader fullPage={true} />
  ) : (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="p-5">
          <BlogProvider>
            <Outlet />
          </BlogProvider>
        </main>
      </div>
      <Sidebar categories={data} />
    </div>
  );
}

export default Layout;
