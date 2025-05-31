import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { getMovies } from "../features/movies/moviesSlice";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { AlertTriangle } from "lucide-react";

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [activeGenre, setActiveGenre] = useState<string | null>(
    localStorage.getItem("activeTitleType")
  );

  const {
    movies,
    getMoviesLoading,
    getMoviesError,
    getMoviesErrorMessage,
    getMoviesSuccess,
  } = useSelector((state: RootState) => state.movie);


  useEffect(() => {
    const handleStorageChange = () => {
      const updatedGenre = localStorage.getItem("activeTitleType");
      setActiveGenre(updatedGenre);
      setPage(1); 
    };

  
    window.addEventListener("storage", handleStorageChange);

    
    const interval = setInterval(() => {
      const updated = localStorage.getItem("activeTitleType");
      if (updated !== activeGenre) {
        handleStorageChange();
      }
    }, 500); 

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [activeGenre]);

  useEffect(() => {
    dispatch(getMovies(page.toString()));
  }, [dispatch, page, activeGenre]);

  if (getMoviesLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (getMoviesError) {
    return (
      <div className="flex flex-col items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center max-w-md mx-auto mt-6 shadow-md">
        <AlertTriangle className="w-6 h-6 mb-2 text-red-600" />
        <p className="font-semibold">Oops! Something went wrong.</p>
        <p className="text-sm mt-1">{getMoviesErrorMessage}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg pt-6">
        No results found.
      </p>
    );
  }

  return (
    <div className="mb-5">
      {getMoviesSuccess && !getMoviesLoading && !getMoviesError && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {movies.map((movie) => {
            const imageUrl = movie.primaryImage?.url;
            const title = movie.titleText?.text;
            const rating = movie.ratingsSummary?.aggregateRating;

            if (!imageUrl || !title) return null;

            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                imageUrl={imageUrl}
                title={title}
                rating={rating}
              />
            );
          })}
        </div>
      )}

      {movies.length > 9 && (
        <Pagination
          currentPage={page}
          totalPages={movies.length}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default MovieList;
