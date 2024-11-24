import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo-dark-transparent.png";
import { useAuth } from "../context/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

function SignInPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, reset, handleSubmit, formState } =
    useForm<LoginFormInputs>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage("");
      await login(data);
      reset();
      navigate("/blogs");
      toast.success(`Welcome back ${user?.first_name ?? ""}`);
    } catch (error) {
      setErrorMessage("Invalid credentials...");
      reset({ password: "" });
    }
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <img src={logo} className="w-36 dark:hidden" alt="blogify-logo" />
            <img
              src={logoDark}
              className="w-36 hidden dark:block"
              alt="blogify-logo"
            />
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-base-content dark:text-base-content">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-base-content"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6 dark:bg-inherit"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-base-content"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password")}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6 dark:bg-inherit"
                />
              </div>
              {errorMessage && (
                <p className="text-sm mt-1 text-red-500">{errorMessage}</p>
              )}
            </div>

            <div>
              <button
                disabled={formState.isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-prtext-primary/hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Sign in{" "}
                {formState.isSubmitting && (
                  <span className="loading loading-sm loading-spinner" />
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to={"/register"}
              className="font-semibold text-primary hover:text-primary"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
