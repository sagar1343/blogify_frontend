import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IBlog } from "../types/IBlog";
import { IComment } from "../types/IComment";
import Comments from "./Comments";
import SocialCounts from "./SocialCounts";

function Social({ blog }: { blog: IBlog }) {
  const { data, loading } = useFetch<IComment[]>("comments/" + blog.id);
  const [comments, setComments] = useState<IComment[]>([]);
  const [upvote, setUpvote] = useState(blog.upvote);

  useEffect(() => {
    data && setComments(data);
  }, [data]);

  if (loading) return <CommentLoader />;
  return (
    <div>
      <SocialCounts
        upvote={upvote}
        setUpvote={setUpvote}
        commentCount={comments.length}
        blogId={blog.id}
      />
      <Comments
        blogId={blog.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default Social;

function CommentLoader() {
  return (
    <div className="flex justify-center">
      <span className="loading loading-dots loading-lg" />
    </div>
  );
}
