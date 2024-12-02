import { BiComment, BiUpvote, BiSolidUpvote } from "react-icons/bi";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { api } from "../service/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  blogId: number;
  commentCount: number;
  upvote: number;
  setUpvote: React.Dispatch<React.SetStateAction<number>>;
}

function SocialCounts({ commentCount, upvote, setUpvote, blogId }: Props) {
  const url = window.location.href;
  const [isUpvoted, setUpvoted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUpvote = async () => {
      const res = await api.get("/upvote/" + blogId);
      setUpvoted(res.data.has_upvoted);
    };
    checkUpvote();
  }, [blogId, upvote]);

  async function upvoteHandler() {
    if (!user) navigate("/signin");
    await api.post("/upvote/" + blogId);
    setUpvoted((prev) => !prev);
    if (isUpvoted) {
      setUpvote((prev) => prev - 1);
    } else {
      setUpvote((prev) => prev + 1);
    }
  }

  return (
    <ul className="p-8 w-full flex items-center gap-3">
      <li>
        <button
          onClick={upvoteHandler}
          className={`btn btn-success ${isUpvoted ? "" : "btn-outline"}`}
        >
          Upvote {upvote}
          {isUpvoted ? (
            <BiSolidUpvote fontSize={20} />
          ) : (
            <BiUpvote fontSize={20} />
          )}
        </button>
      </li>
      <li>
        <button
          disabled
          className="btn btn-success btn-outline disabled:btn-success"
        >
          <BiComment fontSize={20} /> {commentCount}
        </button>
      </li>
      <li className="grow">
        <ul className="flex justify-end space-x-2">
          <li>
            <EmailShareButton url={url}>
              <EmailIcon className="rounded-full size-12" />
            </EmailShareButton>
          </li>
          <li>
            <WhatsappShareButton url={url}>
              <WhatsappIcon className="rounded-full size-12" />
            </WhatsappShareButton>
          </li>
          <li>
            <LinkedinShareButton url={url}>
              <LinkedinIcon className="rounded-full size-12" />
            </LinkedinShareButton>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default SocialCounts;
