import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IUser } from "../types/IUser";

interface Props {
  blogId: number;
  user: IUser;
  handleComment(
    comment: string | undefined,
    object_id: number,
    user: number
  ): Promise<void>;
}

function AddComments({ user, blogId, handleComment }: Props) {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex gap-2 my-12">
      <div className="avatar">
        <div className="size-10 rounded-full">
          <img
            alt={"profile-" + user?.first_name}
            src={user?.profile_picture_url}
          />
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleComment(comment, blogId, user.id);
          setComment(""); // Clear input after submitting
        }}
        className="w-full"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={comment}
            onChange={handleInputChange}
            placeholder="Add comment"
            className="grow block rounded-xl text-base-content px-3.5 py-2 border-none focus:ring-0 focus-visible:ring-0 dark:bg-inherit"
          />
          {comment.length > 0 && (
            <>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => setComment("")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-circle btn-primary"
              >
                <IoSend />
              </button>
            </>
          )}
        </div>
        <hr />
      </form>
    </div>
  );
}

export default AddComments;
