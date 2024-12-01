import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCleaningServices } from "react-icons/md";
import SimpleMdeReact from "react-simplemde-editor";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";
import { ICategory } from "../types/ICategory";
import { IFormData } from "../types/IFormData";

interface Props {
  defaultValues?: IBlog;
  onSubmit: SubmitHandler<IFormData>;
}
function BlogForm({ onSubmit, defaultValues }: Props) {
  const { user } = useAuth();
  const { data } = useFetch<ICategory[]>("/categories");
  const { register, handleSubmit, reset, formState, control } =
    useForm<IFormData>({
      defaultValues: { ...defaultValues, author: user?.id },
    });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-12 items-stretch my-12"
    >
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            type="text"
            className="rounded-md border-0 px-3.5 py-2 text-base bg-inherit shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
          />
          {formState.errors.title && (
            <span className="text-red-600 text-sm">
              {formState.errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            className="rounded-md border-0 px-3.5 py-2 text-base bg-inherit shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm/6"
          />
          {formState.errors.description && (
            <span className="text-red-600 text-sm">
              {formState.errors.description.message}
            </span>
          )}
        </div>

        <input {...register("author")} type="hidden" value={user?.id} />
        <div className="flex flex-col space-y-2">
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field: { value, onChange } }) => {
              return (
                <Listbox value={value} onChange={onChange}>
                  <Label>Category</Label>
                  <div className="relative">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-base py-2 pr-10 text-left text-base bg-inherit shadow-sm ring-1 ring-inset ring-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm/6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {value?.title || "Select"}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <HiChevronUpDown className="size-5 text-zinc-500" />
                      </span>
                    </ListboxButton>
                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-base-100 dark:bg-neutral-content py-1 text-base shadow-lg ring-1 ring-zinc-200 ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {data?.map((category) => (
                        <ListboxOption
                          key={category.id}
                          value={category}
                          className="group cursor-pointer relative select-none py-2 pl-3 pr-9 text-base-content dark:text-primary-content bg-inherit data-[focus]:bg-primary data-[focus]:text-white"
                        >
                          {category.title}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              );
            }}
          />
          {formState.errors.category && (
            <span className="text-red-600 text-sm">
              {formState.errors.category.message}
            </span>
          )}
        </div>
      </div>
      <div className="">
        <Controller
          name={"content"}
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => (
            <SimpleMdeReact
              {...field}
              value={field.value}
              onChange={field.onChange}
              className="mt-4 prose min-w-full"
            />
          )}
        />
        {formState.errors.content && (
          <span className="text-red-600 text-sm">
            {formState.errors.content.message}
          </span>
        )}
      </div>
      <button
        type="reset"
        disabled={formState.isSubmitting}
        onClick={() => reset()}
        className="flex-1 btn text-white bg-[#1F2937] hover:bg-black"
      >
        <MdOutlineCleaningServices size={20} />
        Clear
      </button>
      <button
        type="submit"
        className="flex-1 btn btn-primary"
        disabled={formState.isSubmitting}
      >
        <IoIosSend size={22} />
        {defaultValues ? "Save changes " : "Publish "}
        {formState.isSubmitting && (
          <span className="loading loading-sm loading-spinner" />
        )}
      </button>
    </form>
  );
}

export default BlogForm;
