import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { searchMovies, getMovies } from "../features/movies/moviesSlice";

const LOCAL_STORAGE_KEY = 'activeTitleType'; 

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const activeGenre = localStorage.getItem(LOCAL_STORAGE_KEY); 

    const delayDebounce = setTimeout(() => {
      const keyword = inputValue.trim();
      if (keyword) {
        dispatch(searchMovies({keyword,activeGenre}));
      } else {
        dispatch(getMovies("1"));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, dispatch]);

  return (
    <div className="border border-slate-500 rounded-full ps-7 pr-3 flex items-center">
      <svg
        className="text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
        />
      </svg>
      <input
        placeholder="Search"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full ps-3 py-1 bg-transparent text-white focus:border-0 focus:outline-0"
      />
    </div>
  );
};

export default SearchBar;
