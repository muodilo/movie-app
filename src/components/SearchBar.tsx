import { useMovies } from '../context/MovieContext';
import { useState, useEffect } from 'react';

const SearchBar = () => {
  const { setKeyword } = useMovies();
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setKeyword(inputValue.trim() || undefined); 
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, setKeyword]);

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
