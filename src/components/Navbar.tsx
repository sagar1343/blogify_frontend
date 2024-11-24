import toast from "react-hot-toast";
import { FaRegMoon, FaRegSun, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/logo-dark-transparent.png";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { setFilters } = useBlog();
  const toggleTheme = useTheme();
  return (
    <nav className="navbar bg-base-100 border-b border-neutral/20 w-full">
      <div className="navbar-start">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <Link
          to="/blogs/"
          onClick={() => setFilters({})}
          className="hidden sm:flex btn btn-ghost text-xl"
        >
          <img
            src={logo}
            className="swap-on w-20 dark:hidden"
            alt="blogify-logo"
          />
          <img
            src={logoDark}
            className="swap-off w-20 hidden dark:block"
            alt="blogify-dark-logo"
          />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal">
          <li>
            <Link to="/blogs/new">New</Link>
          </li>
          <li>
            <Link to="/blogs/me">My blogs</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-4">
        <label className="swap swap-rotate">
          <input onChange={toggleTheme} type="checkbox" className="hidden" />
          <FaRegSun fontSize={22} className="swap-on text-inherit" />
          <FaRegMoon fontSize={22} className="swap-off text-inherit" />
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="!flex justify-center items-center w-10 rounded-full">
              {user?.profile_picture_url ? (
                <img alt="Avatar" src={user?.profile_picture_url} />
              ) : (
                <FaUser fontSize={20} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user && (
              <li>
                <Link to="/me">Profile</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully.");
                    navigate("/blogs");
                  }}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
