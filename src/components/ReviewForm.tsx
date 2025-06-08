import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface ReviewFormProps {
  onSubmit: (review: {
    name: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
  submitting: boolean;
}

const MAX_RATING = 5;

export const ReviewForm = ({ onSubmit, submitting }: ReviewFormProps) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim() || rating < 1 || rating > MAX_RATING) return;

    await onSubmit({
      name: name.trim(),
      rating,
      comment: comment.trim(),
    });

    setName("");
    setRating(5);
    setComment("");
    setHoverRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <h3 className="text-xl font-semibold">Add Your Review</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        required
        disabled={submitting}
      />

      <div className="flex items-center gap-1">
        {[...Array(MAX_RATING)].map((_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={starValue}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${starValue} Star${starValue > 1 ? "s" : ""}`}
              disabled={submitting}
            >
              <FaStar
                size={30}
                className={`cursor-pointer transition-colors ${
                  starValue <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-600"
                }`}
              />
            </button>
          );
        })}
      </div>

      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        rows={4}
        required
        disabled={submitting}
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-red-500 px-4 py-2 rounded font-semibold disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};
