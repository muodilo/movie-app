import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";

const Header = () => {
  const { movies, loading, error } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies?.length === 0) return;

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
      <div className="relative w-full lg:h-[250px] md:h-[350px] h-[300px] bg-gray-200 animate-pulse rounded-xl" />
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const limitedMovies = movies?.length > 0 ? movies.slice(0, 4) : [];

  return (
    <div className="relative w-full lg:h-[250px] md:h-[350px] h-[300px] overflow-hidden ">
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
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-around px-4">
              <h2 className="text-white  font-bold  ">
                {title}{index}
              </h2>
              <div>

              </div>
              <div>
              <button className="bg-red-500 px-5 py-2 rounded-xl cursor-pointer">Watch</button>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
