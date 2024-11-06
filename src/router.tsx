import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "./Layout";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import HomePage from "./pages/HomePage";
import MyBlogPage from "./pages/MyBlogPage";
import NewBlogPage from "./pages/NewBlogPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/blogs", element: <HomePage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },
      { path: "/blogs/new", element: <NewBlogPage /> },
      { path: "/blogs/me", element: <MyBlogPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
