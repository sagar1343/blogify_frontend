import { createBrowserRouter, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./Layout";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import EditBlogPage from "./pages/EditBlogPage";
import HomePage from "./pages/HomePage";
import MyBlogPage from "./pages/MyBlogPage";
import NewBlogPage from "./pages/NewBlogPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/blogs", element: <HomePage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/signIn", element: <SignInPage /> },
      {
        path: "/blogs/new",
        element: (
          <PrivateRoute>
            <NewBlogPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/me",
        element: (
          <PrivateRoute>
            <MyBlogPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/edit/:id",
        element: (
          <PrivateRoute>
            <EditBlogPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/me",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <HomePage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
