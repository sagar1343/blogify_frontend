import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import MyBlogPage from "./pages/MyBlogPage";
import NewBlogPage from "./pages/NewBlogPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/blogs", element: <HomePage /> },
      { path: "/blogs/new", element: <NewBlogPage /> },
      { path: "/blogs/me", element: <MyBlogPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
