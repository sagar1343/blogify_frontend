import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { api } from "../service/api";
import { IComment } from "../types/IComment";
import AddComments from "./AddComments";
import ListComments from "./ListComments";

function Comments({ blogId }: { blogId: number }) {
  const { user } = useAuth();
  const { data, count, loading } = useFetch<IComment[]>("comments/" + blogId);
  const [comments, setComments] = useState<IComment[]>([]);

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

  useEffect(() => {
    data && setComments(data);
  }, [data]);

  if (loading) return <CommentLoader />;
  return (
    <section className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">{count} Comments</h1>
      {blogId && user && (
        <AddComments user={user} blogId={blogId} handleComment={addComment} />
      )}
      {comments && <ListComments comments={comments} />}
    </section>
  );
}

function CommentLoader() {
  return (
    <div className="flex justify-center">
      <span className="loading loading-dots loading-lg" />
    </div>
  );
}

export default Comments;
