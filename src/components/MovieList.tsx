import { useMovies } from "../context/MovieContext";
import Pagination from "../components/Pagination";

const MovieList = () => {
  const { movies, loading, error, page, setPage } = useMovies();
  const totalPages = 10; 

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-7">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-40 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="pt-7 mb-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {movies.map((movie) => {
          const imageUrl = movie.primaryImage?.url;
          const title = movie.titleText?.text;

          if (!imageUrl || !title) return null;

          return (
            <div
              key={movie.id}
              className="border-2 border-slate-600/30 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2">
                <h3 className="text-sm text-slate-500 font-semibold truncate">
                  {title}
                </h3>
                <p className="text-xs text-gray-500">
                  {movie.releaseYear?.year || "Unknown Year"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default MovieList;
