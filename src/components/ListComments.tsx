import { IComment } from "../types/IComment";

function ListComments({ comments }: { comments: IComment[] }) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        return (
          <div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={"profile-" + comment.user.username}
                    src={comment.user.profile_picture_url}
                  />
                </div>
              </div>
              <div className="chat-bubble w-full max-w-full bg-zinc-200 text-base-content dark:bg-neutral">
                {comment.comment}
              </div>
              <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">
                  {new Date(comment.commented_at).toDateString()}
                </time>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListComments;
