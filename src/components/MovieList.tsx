import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type{ AppDispatch, RootState } from "../app/store";
import { getMovies } from "../features/movies/moviesSlice";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, getMoviesLoading, getMoviesError, getMoviesErrorMessage } = useSelector(
    (state: RootState) => state.movie
  );

  const [page, setPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    dispatch(getMovies(page.toString()));
  }, [dispatch, page]);

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
    return <p className="text-red-500 text-center">{getMoviesErrorMessage}</p>;
  }

  if (movies.length === 0) {
    return <p className="text-center text-gray-500 text-lg pt-6">No results found.</p>;
  }

  return (
    <div className="mb-5">
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

      {movies.length > 9 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default MovieList;
