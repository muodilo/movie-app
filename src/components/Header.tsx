import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";

const Header = () => {
  const { movies, loading, error } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 3 ? 0 : prevIndex + 1 
      );
    }, 4000);
    console.log(movies);
    return () => clearInterval(interval);
  }, [movies]);

  if (loading) {
    return (
      <div className="relative w-full lg:h-[400px] md:h-[350px] h-[300px] bg-gray-800 animate-pulse rounded-xl" />
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const limitedMovies = movies.slice(0, 4);

  return (
    <div className="relative w-full lg:h-[400px] md:h-[350px] h-[300px] overflow-hidden ">
      {limitedMovies.map((movie, index) => {
        const imageUrl = movie.primaryImage?.url;
        const title = movie.titleText?.text;

        if (!imageUrl || !title) return null;

        return (
          <div
            key={index}
            className={`absolute rounded-4xl top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
                {title}{index}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
