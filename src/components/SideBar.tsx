import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useMovies } from '../context/MovieContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { getMovieGenres } from '../features/movies/moviesSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

const LOCAL_STORAGE_KEY = 'activeTitleType';

const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { setTitleType } = useMovies();
  const [collapsed, setCollapsed] = useState(false);
  const [activeType, setActiveType] = useState<string>('');

  const { genres, getGenresLoading } = useSelector(
    (state: RootState) => state.movie
  );

  // Only fetch genres once if they are empty
  useEffect(() => {
    if (!genres || genres.length === 0) {
      dispatch(getMovieGenres());
    }
  }, [dispatch, genres]);

  // Sync activeType with URL/localStorage on location.search change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genreFromURL = searchParams.get('genre');
    const storedType = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';

    const initialType = genreFromURL || storedType;

    setActiveType(initialType);
    setTitleType(initialType);
  }, [location.search, setTitleType]);

  // Handle storage event from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        const newType = event.newValue ?? '';
        setActiveType(newType);
        setTitleType(newType);

        const searchParams = new URLSearchParams(location.search);
        if (newType) {
          searchParams.set('genre', newType);
        } else {
          searchParams.delete('genre');
        }
        navigate({ search: searchParams.toString() }, { replace: true });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location.search, navigate, setTitleType]);

  const handleTypeClick = (type: any) => {
    if (type === '') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, type);
    }

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

  return (
    <aside className="relative h-screen md:block hidden">
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-black border-r-2 border-slate-800 text-white h-full transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-start gap-2 px-5 pt-4 mb-4 shrink-0">
          <Logo />
          {!collapsed && <p className="text-lg font-bold">Movie App</p>}
        </div>

        <nav className="flex-1 overflow-auto px-5 space-y-2 pb-4">
          {getGenresLoading && (!genres || genres.length === 0) ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 mb-5 rounded-full bg-gray-700 animate-pulse w-full"
              />
            ))
          ) : (
            genres?.map((type) => (
              <div
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`flex items-center gap-3 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                  activeType === type
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-red-500 hover:text-white'
                }`}
              >
                {!collapsed && <span>{type || 'All'}</span>}
              </div>
            ))
          )}
        </nav>
      </div>

      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute top-3 left-[calc(100%+4px)] z-20 border-2 bg-black border-slate-800 p-2 rounded-lg text-white shadow cursor-pointer"
      >
        <IoIosArrowBack className={collapsed ? 'rotate-180' : ''} />
      </button>
    </aside>
  );
};

export default SideBar;
