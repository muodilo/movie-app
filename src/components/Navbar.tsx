import { useEffect, useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useMovies } from '../context/MovieContext';
import { MdOutlineClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { getMovieGenres } from '../features/movies/moviesSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoBookmarks } from "react-icons/io5";

const LOCAL_STORAGE_KEY = 'activeTitleType';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { setTitleType } = useMovies();
  const [collapsed, setCollapsed] = useState(false);
  const [activeType, setActiveType] = useState<string>('');

  const { genres: titleTypes, getGenresLoading: loading } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    if (!titleTypes || titleTypes.length === 0) {
      dispatch(getMovieGenres());
    }
  }, [dispatch, titleTypes]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genreFromURL = searchParams.get('genre');
    const storedType = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';

    const initialType = genreFromURL || storedType;

    setActiveType(initialType);
    setTitleType(initialType);
  }, [location.search, setTitleType]);

  useEffect(() => {
    const updateType = (newType: string) => {
      setActiveType(newType);
      setTitleType(newType);

      const searchParams = new URLSearchParams(location.search);
      if (newType) {
        searchParams.set('genre', newType);
      } else {
        searchParams.delete('genre');
      }
      navigate({ search: searchParams.toString() }, { replace: true });
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        updateType(event.newValue ?? '');
      }
    };

    const handleCustomChange = () => {
      const newType = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
      updateType(newType);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('activeTitleTypeChanged', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('activeTitleTypeChanged', handleCustomChange);
    };
  }, [location.search, navigate, setTitleType]);

  const handleTypeClick = (type: any) => {
    if (type === '') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, type);
    }

    window.dispatchEvent(new Event('activeTitleTypeChanged'));

    setActiveType(type);
    setTitleType(type);

    const searchParams = new URLSearchParams(location.search);
    if (type) {
      searchParams.set('genre', type);
    } else {
      searchParams.delete('genre');
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };


  const goToWatchlist = () => {
    navigate('/watchlist');
  };

  return (
    <nav className="py-2">
      
      <div className="md:flex justify-center hidden items-center lg:gap-25 md:gap-15">
        <SearchBar />
        <button
          onClick={goToWatchlist}
          className="bg-red-500 flex items-center gap-1 text-xs cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-full"
        >
          <IoBookmarks/>
          <p>Watchlist</p>
        </button>
      </div>

      {/* Mobile Nav Header */}
      <div className="md:hidden py-4 fixed top-0 left-0 right-0 z-50 dark:bg-black bg-white px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="font-bold">Movie APP</p>
        </div>
        <div>
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="dark:text-white"
          >
            {collapsed ? (
              <MdOutlineClose className='text-xl' />
            ) : (
              <FiMenu className='text-xl' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {collapsed && (
        <div className="fixed md:hidden top-0 left-0 right-0 dark:bg-black bg-white bg-opacity-80 z-40 pt-16">
          <div className="w-full dark:bg-black dark:text-white p-5">
            <SearchBar />

            <div className="pt-5">
              <button
                onClick={goToWatchlist}
                className="mb-4 w-full rounded-full bg-red-500 hover:bg-red-600 py-2 text-xs text-white font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                <IoBookmarks/>
                <p>Watchlist</p>
              </button>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 mb-4 w-1/3"></div>
                  <div className="h-6 bg-gray-700 mb-4 w-1/3"></div>
                </div>
              ) : (
                <ul className="h-36 overflow-auto scrollbar-black">
                  {titleTypes?.map((type) => (
                    <li
                      key={type}
                      onClick={() => handleTypeClick(type)}
                      className={`flex items-center gap-3 my-2 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                        activeType === type
                          ? 'bg-red-500 text-white'
                          : 'hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <span>{type || 'All'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
