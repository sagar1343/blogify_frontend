import { CiLogin, CiLogout, CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link as ReactScrollLink } from "react-scroll";

function ProfileCard() {
  const { user } = useAuth();
  return (
    <div className="card bg-base-100 shadow-md">
      <figure className="px-14 pt-6 flex flex-col">
        {user?.profile_picture_url ? (
          <img
            src={user?.profile_picture_url}
            alt="user-avatar"
            className="rounded-xl"
          />
        ) : (
          <FaUser fontSize={40} />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user?.first_name}</h2>
        <span className="text-xs uppercase">Personal Profile</span>
        <ul className="menu w-full">
          <li>
            <ReactScrollLink to="profile" smooth duration={400}>
              <CiUser fontSize={25} className="rounded-full" /> Profile
            </ReactScrollLink>
          </li>
          <li>
            <ReactScrollLink to="signindetails" smooth duration={400}>
              <CiLogin fontSize={25} className="rounded-full" /> Sign In Details
            </ReactScrollLink>
          </li>
          <li>
            <Link to="/blogs">
              <CiLogout fontSize={25} className="rounded-full" />
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;
