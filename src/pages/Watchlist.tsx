import React from "react";
import { MdBookmarkRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { removeFromWatchlist } from "../features/watchlist/watchlistSlice";
import DefaultImage from "../assets/defaultimage.webp";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Watchlist: React.FC = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(
    (state: RootState) => state.watchlist.watchlist
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <div className="bg-black min-h-screen">
      <nav className="px-5 border-b bg-black  border-slate-700 fixed z-50 left-0 right-0">
        <Link to="/" className="flex py-4 items-center gap-2 text-white">
          <Logo />
          <p className="text-lg font-bold">Movie App</p>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="p-5 ">
        {watchlist.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-gray-400 text-lg">
              Your watchlist is currently empty.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-white text-2xl font-bold mb-4 pt-15">
              My Watchlist
            </h2>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {watchlist.map(({ id, title, imageUrl, rating }) => (
                <div
                  key={id}
                  className="bg-zinc-900 border border-slate-700 relative shadow-md rounded-3xl overflow-hidden"
                >
                  <Link to={`/movie/${id}`}>
                    <img
                      src={imageUrl || DefaultImage}
                      alt={title}
                      onError={(e) => {
                        e.currentTarget.src = DefaultImage;
                      }}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-3">
                    <h3 className="text-sm text-gray-200 font-semibold truncate">
                      {title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-gray-400 text-sm">{rating ?? "N/A"}</p>

                      <button
                        onClick={() => handleRemove(id)}
                        title="Remove from watchlist"
                      >
                        <MdBookmarkRemove className="text-red-500 text-xl cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
