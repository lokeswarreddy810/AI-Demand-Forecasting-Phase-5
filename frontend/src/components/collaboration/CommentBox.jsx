import { useState } from "react";

function CommentBox({ onSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;

    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Add Comment
      </h2>

      <textarea
        rows="4"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
        placeholder="Write your comment..."
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-[#9dff00] px-6 py-3 rounded-xl font-bold"
      >
        Submit
      </button>
    </div>
  );
}

export default CommentBox;