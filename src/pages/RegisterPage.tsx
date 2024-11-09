import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useUpload from "../hooks/useUpload";
import { api } from "../service/api";

interface FormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_picture_url: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
}

function Register() {
  const navigate = useNavigate();
  const cloudinaryUpload = useUpload();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleImageInput = async () => {
    setLoading(true);
    try {
      const uploadedImageUrl = await cloudinaryUpload(
        pictureRef.current?.files?.[0]
      );
      setImage(uploadedImageUrl);
    } catch (err) {
      console.error("Error uploading image", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    data.profile_picture_url = image;
    setLoading(true);
    api
      .post("/auth/users/", data)
      .then(() => {
        reset();
        toast.success("Registration successful! You can now log in.");
        navigate("/signin");
      })
      .catch((err) => {
        setErrors(err.response.data);
      })
      .finally(() => setLoading(false));
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <img src={logo} className="w-36" alt="blogify-logo" />
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="mt-2 flex flex-col gap-2 justify-center items-center gap-x-3">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : image ? (
                <img
                  src={image}
                  className="h-12 w-12 rounded-full object-cover"
                  alt="profile-image"
                />
              ) : (
                <FaUserCircle className="h-12 w-12 text-gray-300" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={pictureRef}
                className="hidden"
                onChange={handleImageInput}
              />
              <button
                onClick={() => pictureRef.current?.click()}
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username")}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
                />
                {errors?.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  {...register("first_name")}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
                />
                {errors?.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  {...register("last_name")}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
                />
                {errors?.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:bg-gray-300"
                disabled={loading}
              >
                Sign Up{" "}
                {loading && <span className="loading loading-spinner" />}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-primary hover:text-primary-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
