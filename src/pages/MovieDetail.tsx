import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { getMovieDetails } from "../features/movies/moviesSlice";
import { fetchReviews, addReview } from "../features/reviews/reviewsSlice";
import type { Review } from "../features/reviews/reviewsSlice";
import {
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
} from "../features/watchlist/watchlistSlice";
import defaultImage from "../assets/defaultimage.webp";
import { ReviewForm } from "../components/ReviewForm";

import { FaImdb, FaStar, FaRegStar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";

const MovieDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const {
    movieDetail,
    movieDetailLoading,
    movieDetailError,
    movieDetailErrorMessage,
  } = useSelector((state: RootState) => state.movie);

  const reviews = useSelector((state: RootState) =>
    id ? state.reviews.data[id] || [] : []
  );
  const reviewsLoading = useSelector(
    (state: RootState) => state.reviews.loading
  );
  const reviewsError = useSelector((state: RootState) => state.reviews.error);

  const watchlist = useSelector(selectWatchlist);
  const isInWatchlist = watchlist.some((movie) => movie.id === id);

  const [submitting, setSubmitting] = useState(false);

  const handleToggleWatchlist = () => {
    if (!id || !movieDetail?.titleText?.text) return;

    const movie = {
      id,
      title: movieDetail.titleText.text,
      imageUrl: movieDetail.primaryImage?.url || defaultImage,
      rating: movieDetail.ratingsSummary?.aggregateRating?.toString() || "N/A",
    };

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  const handleReviewSubmit = async (review: {
    name: string;
    rating: number;
    comment: string;
  }) => {
    if (!id) return;

    setSubmitting(true);
    const newReview: Review = {
      ...review,
      timestamp: new Date().toISOString(),
    };

    try {
      await dispatch(addReview({ movieId: id, review: newReview })).unwrap();
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setSubmitting(false);
    }
  };

  const imageUrl = movieDetail?.primaryImage?.url || defaultImage;

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden dark:bg-black dark:text-white px-6 pb-10">
      <div className="fixed top-0 left-0 w-full z-50 dark:bg-black bg-white bg-opacity-90 px-6 py-4 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 text-red-500 hover:underline">
            <IoMdArrowRoundBack className="text-2xl" />
            <p className="font-semibold">Back to Home</p>
          </Link>
        </div>
      </div>

      <div className="pt-20 max-w-5xl mx-auto">
        {/* Loading */}
        {movieDetailLoading && (
          <div className="w-full flex justify-center items-center py-20">
            <AiOutlineLoading3Quarters className="text-red-500 text-5xl animate-spin" />
          </div>
        )}

        {/* Error */}
        {movieDetailError && (
          <div className="w-full text-center text-red-500 py-20">
            {movieDetailErrorMessage}
          </div>
        )}

        {/* No Movie Found */}
        {!movieDetail && !movieDetailLoading && !movieDetailError && (
          <div className="w-full text-center py-20">
            <p>No movie found.</p>
          </div>
        )}

        {/* Movie Details */}
        {movieDetail && (
          <div className="dark:bg-black bg-opacity-80 rounded-lg p-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{movieDetail.titleText?.text}</h1>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Image */}
              <div className="max-h-[400px] overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={movieDetail.titleText?.text || "Movie Poster"}
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                  className="w-full  object-contain rounded shadow-lg"
                />
              </div>

              {/* Details */}
              <div>
                <div className="mb-4 space-y-2">
                  <p>
                    <strong>Release Date:</strong>{" "}
                    {movieDetail.releaseDate?.day}/{movieDetail.releaseDate?.month}/{movieDetail.releaseDate?.year}
                  </p>
                  <p>
                    <strong>Type:</strong> {movieDetail.titleType?.text}
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <FaImdb className="text-yellow-400 text-3xl" />
                  <span className="text-xl">{movieDetail.ratingsSummary?.aggregateRating || "N/A"}</span>
                </div>

                <p className="text-gray-300 mb-6">{movieDetail.plot?.plotText?.plainText}</p>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-red-500 px-6 py-2 text-white rounded-full font-semibold hover:bg-red-600 transition">
                    Watch Now
                  </button>
                  <button className="border border-red-500 text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
                    Trailer
                  </button>
                  <button
                    onClick={handleToggleWatchlist}
                    title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    {isInWatchlist ? (
                      <MdBookmarkAdded className="text-red-500 text-3xl" />
                    ) : (
                      <MdBookmarkAdd className="dark:text-white text-3xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <section className="mt-10">
              <h2 className="text-3xl font-semibold mb-4">Reviews</h2>

              {reviewsLoading && <p>Loading reviews...</p>}
              {reviewsError && <p className="text-red-500">{reviewsError}</p>}

              {reviews.length === 0 && !reviewsLoading && (
                <p>No reviews yet. Be the first to review!</p>
              )}

              <ul className="mb-8 space-y-4 max-h-64 overflow-auto">
                {reviews.map((rev, idx) => (
                  <li
                    key={idx}
                    className="border border-gray-700 rounded p-4 dark:bg-gray-900"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{rev.name}</p>
                      <div className="flex gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) =>
                          i < rev.rating ? (
                            <FaStar key={i} className="text-sm" />
                          ) : (
                            <FaRegStar key={i} className="text-sm" />
                          )
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      {new Date(rev.timestamp).toLocaleString()}
                    </p>
                    <p className="mt-1">{rev.comment}</p>
                  </li>
                ))}
              </ul>

              <ReviewForm onSubmit={handleReviewSubmit} submitting={submitting} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
