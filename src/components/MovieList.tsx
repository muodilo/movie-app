import { useMovies } from "../context/MovieContext";

const MovieList = () => {
  const { movies, loading, error } = useMovies();

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-7">
      {movies.map((movie) => {
        const imageUrl = movie.primaryImage?.url;
        const title = movie.titleText?.text;

        if (!imageUrl || !title) return null;

        return (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">{title}</h3>
              <p className="text-xs text-gray-500">
                {movie.releaseYear?.year || "Unknown Year"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
