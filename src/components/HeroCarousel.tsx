import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";

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
    return <p className="text-red-500">{error}</p>;
  }

  const limitedMovies = movies?.length > 0 ? movies.slice(0, 4) : [];

  return (
    <div className="relative w-full lg:h-[250px] md:h-[350px] h-[300px] overflow-hidden border-2 rounded-xl border-slate-600">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="15" r="2" fill="currentColor" />
                    <path
                      fill="currentColor"
                      d="M1 7.4a12 13 0 0 1 18 0l-1.5 1.4a10 11.1 0 0 0-15 0zm3.7 3.2a7 7.3 0 0 1 10.7 0L14 12a5 5.3 0 0 0-7.8 0z"
                    />
                  </svg>
                  <p>Live</p>
                </button>
              </div>
              <div className="text-white max-w-[60%] pb-5">
                <h2 className="font-bold text-4xl">{title}</h2>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.646 10.237q-.085-.048-.313-.048v3.542q.301 0 .371-.122c.07-.122.07-.301.07-.66v-2.092q0-.366-.023-.469a.22.22 0 0 0-.105-.151m3.499 1.182q-.124 0-.162.091q-.037.091-.037.46v1.426q0 .355.041.456q.044.1.168.1c.086 0 .199-.035.225-.103q.04-.104.039-.495V11.97q0-.342-.043-.447c-.032-.069-.147-.104-.231-.104"/><path fill="currentColor" d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M6.631 14.663H5.229V9.266h1.402zm4.822 0H10.23l-.006-3.643l-.49 3.643h-.875L8.342 11.1l-.004 3.563H7.111V9.266H8.93q.077.49.166 1.15l.201 1.371l.324-2.521h1.832zm3.664-1.601c0 .484-.027.808-.072.97a.73.73 0 0 1-.238.383a1 1 0 0 1-.422.193q-.25.055-.754.055h-1.699V9.266h1.047c.678 0 1.07.031 1.309.093q.36.093.545.306q.188.213.234.475c.031.174.051.516.051 1.026zm3.654.362q0 .486-.066.723a.76.76 0 0 1-.309.413a.95.95 0 0 1-.572.174c-.158 0-.365-.035-.502-.104a1.1 1.1 0 0 1-.377-.312l-.088.344h-1.262V9.266h1.35v1.755a1.1 1.1 0 0 1 .375-.289c.137-.064.344-.096.504-.096q.28 0 .484.087a.72.72 0 0 1 .44.549q.023.15.023.638z"/></svg>
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
