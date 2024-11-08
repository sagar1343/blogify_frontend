import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  return <div className="text-black">{user?.email}</div>;
}

export default Profile;
