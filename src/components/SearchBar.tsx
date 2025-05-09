const SearchBar = () => {
  return (
            <div className="border rounded-full ps-7 pr-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
            />
          </svg>
          <input
            placeholder="Search "
            type="text"
            className="w-full ps-3 py-1 focus:border-0 focus:outline-0"
          />
        </div>
  )
}

export default SearchBar