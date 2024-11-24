import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
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
  if (loading) return <Loader fullPage />;

  return (
    <div className="drawer">
      <BlogProvider>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          <main className="p-5 min-h-custom">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <Sidebar categories={data} />
        <Toaster />
      </BlogProvider>
    </div>
  );
}

export default Layout;
