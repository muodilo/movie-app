import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { getMovieDetails } from "../features/movies/moviesSlice";
import { FaImdb } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import {
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
} from "../features/watchlist/watchlistSlice";
import defaultImage from "../assets/defaultimage.webp"; 

const MovieDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const {
    movieDetail,
    movieDetailLoading,
    movieDetailError,
    movieDetailErrorMessage,
  } = useSelector((state: RootState) => state.movie);

  const watchlist = useSelector(selectWatchlist);
  const isInWatchlist = watchlist.some((movie) => movie.id === id);

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
    }
  }, [dispatch, id]);

  if (movieDetailLoading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <AiOutlineLoading3Quarters className="text-red-500 text-5xl animate-spin" />
      </div>
    );
  }

  if (movieDetailError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 text-lg">{movieDetailErrorMessage}</p>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>No movie found.</p>
      </div>
    );
  }

  const {
    titleText,
    primaryImage,
    ratingsSummary,
    plot,
    releaseDate,
    titleType,
  } = movieDetail;

  const imageUrl = primaryImage?.url || defaultImage;

  return (
    <div className="relative w-screen h-screen">
      {/* Background image */}
      <img
        src={imageUrl || defaultImage}
        onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        alt={"Movie Background"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent px-6 py-10 flex flex-col justify-between">
        {/* Top badge */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-1">
            <IoMdArrowRoundBack className="text-red-500 text-3xl font-black" />
            <p className="text-white font-bold">Go Back</p>
          </Link>
        </div>

        {/* Bottom content */}
        <div className="text-white max-w-2xl">
          <div className="flex items-center gap-7">
            <p>
              <strong>Release Date:</strong> {releaseDate?.day}/
              {releaseDate?.month}/{releaseDate?.year}
            </p>
            <p>
              <strong>Type:</strong> {titleType?.text}
            </p>
          </div>
          <h1 className="text-5xl font-bold mb-4">{titleText?.text}</h1>

          <div className="flex items-center gap-3 mb-2">
            <FaImdb className="text-3xl " />
            <p className="text-xl">{ratingsSummary?.aggregateRating}</p>
          </div>

          <p className="text-gray-300 mb-4">
            {plot?.plotText?.plainText}
          </p>

          <div className="text-sm space-y-1 text-gray-200 mb-6">
            
          </div>

          <div className="flex items-center gap-5">
            <button className="bg-red-500 cursor-pointer px-6 py-3 rounded-full font-semibold">
              Watch Now
            </button>
            <button className="border cursor-pointer border-red-500 text-red-500 px-6 py-3 rounded-full font-semibold">
              Trailer
            </button>

            <button
              onClick={handleToggleWatchlist}
              title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isInWatchlist ? (
                <MdBookmarkAdded className="text-red-500 text-4xl" />
              ) : (
                <MdBookmarkAdd className="text-white text-4xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
