import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { api } from "../service/api";
import { Gender } from "../types/IGender";
import GenderSelector from "./GenderSelector";

interface FormData {
  first_name: string;
  last_name: string;
  gender: string;
}

interface ApiErrors {
  first_name?: string[];
  last_name?: string[];
}

const gender: Gender[] = [
  { id: "1", name: "Male", value: "MALE" },
  { id: "2", name: "Female", value: "FEMALE" },
  { id: "3", name: "Other", value: "OTHER" },
];

function ProfileUpdateForm() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn btn-sm btn-ghost">
        <FaPen />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform rounded-lg bg-white dark:bg-base- text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="my-4 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base px-4 font-semibold text-gray-900"
                    >
                      Edit Profile
                    </DialogTitle>
                    <div className="mt-4">
                      <ProfileForm setOpen={setOpen} />
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function ProfileForm({ setOpen }: { setOpen: React.Dispatch<boolean> }) {
  const { user, setUserData } = useAuth();
  const { register, formState, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      gender: user?.gender,
    },
  });
  const [error, setError] = useState<ApiErrors | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    try {
      await api.patch("/auth/users/me/", data);
      setUserData();
      setOpen(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      setError(err.response?.data || {});
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 px-4 py-1 text-left"
    >
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 items-center sm:px-0">
        <dt className="text-sm/6 font-medium text-gray-900">First Name</dt>
        <dd className="mt-1 col-span-2">
          <input
            id="first_name"
            defaultValue={user?.first_name}
            {...register("first_name")}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
          />
          <p className="text-xs my-1 text-red-500">
            {error?.first_name?.[0] || ""}
          </p>
        </dd>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 items-center sm:px-0">
        <dt className="text-sm font-medium text-gray-900">Last Name</dt>
        <dd className="mt-1 col-span-2">
          <input
            id="last_name"
            defaultValue={user?.last_name}
            {...register("last_name")}
            type="text"
            className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
          />
          <p className="text-xs my-1 text-red-500">
            {error?.last_name?.[0] || ""}
          </p>
        </dd>
      </div>
      <Controller
        control={control}
        name="gender"
        render={({ field }) => {
          return (
            <GenderSelector
              gender={gender}
              selectedGender={field.value}
              setSelectedGender={field.onChange}
            />
          );
        }}
      />
      <div className="!mt-8">
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:bg-gray-300"
          disabled={formState.isSubmitting}
        >
          Save{" "}
          {formState.isSubmitting && (
            <span className="loading loading-spinner ml-2" />
          )}
        </button>
      </div>
    </form>
  );
}
export default ProfileUpdateForm;
