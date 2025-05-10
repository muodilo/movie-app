import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { FaImdb } from "react-icons/fa";
import { MdOutlineLiveTv } from "react-icons/md";

const Header = () => {
  const { movies, loading, error } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies?.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
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
    return (
    <div className="w-full lg:h-[250px] md:h-[350px] h-[300px] overflow-hidden border-2 rounded-xl border-slate-600 flex items-center justify-center">
     <p className="text-red-500">{error}</p>
     </div>)
      
  }

  const limitedMovies = movies?.length > 0 ? movies.slice(0, 4) : [];

  return (
    <div className="relative w-full lg:h-[250px] md:h-[350px] h-[300px] overflow-hidden border-2 rounded-xl border-slate-600/30">
      {limitedMovies.map((movie, index) => {
        const imageUrl = movie.primaryImage?.url;
        const title = movie.titleText?.text;

        if (!imageUrl || !title) return null;

        return (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-between px-4">
              <div className="flex items-center pt-5">
                <button className="flex items-center gap-2 px-2 py-1 bg-red-500 rounded-full">
                  <MdOutlineLiveTv/>
                  <p className="text-xs">Live</p>
                </button>
              </div>
              <div className="text-white max-w-[60%] pb-5">
                <h2 className="font-bold text-4xl">{title}</h2>
                <div className="flex items-center gap-2">
                  <FaImdb className="text-xl"/>
                  <p>4.5</p>
                </div>
                <div className="mt-4">
                  <button className="bg-red-500 px-5 py-2 rounded-xl cursor-pointer">
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
