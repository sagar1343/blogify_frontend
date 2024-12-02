import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../service/api";
import { IComment } from "../types/IComment";
import AddComments from "./AddComments";
import ListComments from "./ListComments";

interface Props {
  blogId: number;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function Comments({ blogId, comments, setComments }: Props) {
  const { user } = useAuth();

  async function addComment(comment: string, object_id: number, user: number) {
    if (!comment && !user) return;
    const payload = {
      comment,
      object_id,
      content_type: 6,
      user,
    };
    try {
      const res = await api.post("comments/" + blogId, payload);
      setComments((prevComments) => [res.data, ...prevComments]);
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Comment failed");
    }
  }

  return (
    <section className="p-8 space-y-10">
      <h1 className="text-2xl font-semibold">{comments.length} Comments</h1>
      {blogId && user && (
        <AddComments user={user} blogId={blogId} handleComment={addComment} />
      )}
      {comments && <ListComments comments={comments} />}
    </section>
  );
}

export default Comments;
