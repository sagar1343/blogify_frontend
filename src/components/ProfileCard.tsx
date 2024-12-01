import { useRef, useState } from "react";
import { CiLogin, CiLogout, CiUser } from "react-icons/ci";
import { FaPen, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Link as ReactScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import useUpload from "../hooks/useUpload";
import { api } from "../service/api";
import toast from "react-hot-toast";

function ProfileCard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user?.profile_picture_url);
  const profileRef = useRef<HTMLInputElement>(null);
  const cloudinaryUpload = useUpload();
  const [loading, setLoading] = useState(false);

  async function handleProfileChange(): Promise<void> {
    if (
      !profileRef.current ||
      !profileRef.current.files ||
      !profileRef.current.files[0]
    )
      return;

    try {
      setLoading(true);
      const profile_picture_url = await cloudinaryUpload(
        profileRef.current?.files[0]
      );
      await api.patch("/auth/users/me/", { profile_picture_url });
      setProfile(profile_picture_url);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <figure className="px-14 pt-6 flex flex-col">
        {loading ? (
          <div className="skeleton size-32 rounded-2xl" />
        ) : profile ? (
          <div className="avatar">
            <div className="w-32 rounded-2xl">
              <img src={profile} />
            </div>
          </div>
        ) : (
          <FaUser size={128} />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <input
          onChange={handleProfileChange}
          type="file"
          ref={profileRef}
          accept="image/*"
          className="hidden"
        />
        <h2 className="card-title">
          {user?.first_name}
          <button
            onClick={() => profileRef.current?.click()}
            className="btn btn-ghost btn-sm"
          >
            <FaPen />
          </button>
        </h2>
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
            <Link
              onClick={() => {
                logout();
                toast.success("Logged out successfully.");
              }}
              to="/blogs"
            >
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
