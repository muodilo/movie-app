import { useMovies } from "../context/MovieContext";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

const MovieList = () => {
  const { movies, loading, error, page, setPage } = useMovies();
  const totalPages = 10;

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
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
          const rating=movie.ratingsSummary?.aggregateRating

          if (!imageUrl || !title) return null;

          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imageUrl={imageUrl}
              title={title}
              rating={rating}
              year={movie.releaseYear?.year}
            />
          );
        })}
      </div>

      {/* Show pagination only if more than 10 results */}
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
