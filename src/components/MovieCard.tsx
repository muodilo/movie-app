import React from "react";
import { FaImdb } from "react-icons/fa";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import DefaultImage from "../assets/defaultimage.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
} from "../features/watchlist/watchlistSlice"; 

interface MovieCardProps {
  id: string;
  imageUrl: string;
  title: string;
  rating?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  imageUrl,
  title,
  rating,
}) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);

  const isInWatchlist = watchlist.some((movie) => movie.id === id);

  const handleToggleWatchlist = () => {
    const movie = { id, title, imageUrl, rating };
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  return (
    <div
      key={id}
      className="border-2 border-slate-600/30 relative shadow-md rounded-4xl overflow-hidden cursor-pointer"
    >
      <Link to={`movie/${id}`}>
        <img
          src={imageUrl || DefaultImage}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = DefaultImage;
          }}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-2">
        <h3 className="text-sm text-slate-500 font-semibold truncate">
          {title}
        </h3>

        <div className="pb-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <FaImdb />
            <p className="text-slate-500">{rating}</p>
          </div>

          <button
            onClick={handleToggleWatchlist}
            title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isInWatchlist ? (
              <MdBookmarkAdded className="text-red-500 text-xl" />
            ) : (
              <MdBookmarkAdd className="text-gray-500 text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
