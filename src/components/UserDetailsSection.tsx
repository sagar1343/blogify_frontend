import { Element } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";
import ProfileUpdateForm from "./ProfileUpdateForm";

function UserDetailsSection() {
  const { user } = useAuth();
  const { count } = useFetch<IBlog[]>("/blogs?author=" + user?.id);
  return (
    <div className="space-y-20">
      <Element name="profile" className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">
            Profile <ProfileUpdateForm />
          </h2>
          <p className="text-neutral-400">
            Basic info, for a better experience
          </p>
          <div className="mt-4">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 text-base-content font-medium">
                  First name
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.first_name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Last name
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.last_name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Gender
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.gender?.charAt(0) || "-"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Post
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {count}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Email address
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Element>
      <Element name="signindetails" className="card bg-base-100 shadow-md">
        <div className="card-body ">
          <h2 className="card-title">Sign In Details</h2>
          <p className="text-neutral-400">
            Manage your email address and password
          </p>
          <div className="mt-4">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Username
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.username}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Email address
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  {user?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-base-content">
                  Password
                </dt>
                <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">
                  *************
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Element>
    </div>
  );
}

export default UserDetailsSection;
