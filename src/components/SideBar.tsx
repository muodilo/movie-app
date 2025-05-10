import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import { IoIosArrowBack } from 'react-icons/io';
import { useMovies } from '../context/MovieContext';

interface TitleTypesResponse {
  results: (string | null)[];
}

const LOCAL_STORAGE_KEY = 'activeTitleType';

const SideBar = () => {
  const { setTitleType } = useMovies();
  const [collapsed, setCollapsed] = useState(false);
  const [titleTypes, setTitleTypes] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedType = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedType) setActiveType(storedType);

    const fetchTitleTypes = async () => {
      const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/utils/titleTypes',
        headers: {
          'x-rapidapi-key': '9d133dcac2mshfea44f15c5b3071p192404jsn242a204d21f5',
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request<TitleTypesResponse>(options);
        const filteredResults = response.data.results.filter(
          (item): item is string => item !== null
        );
        setTitleTypes(filteredResults);
      } catch (error) {
        console.error('Error fetching title types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitleTypes();
  }, []);

  const handleTypeClick = (type: string) => {
    if (type === '') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, type);
    }
    setActiveType(type);
    setTitleType(type);
  };

  return (
    <aside className="relative h-screen md:block hidden">
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-gray-900 border-r-2 border-slate-800 text-white h-full transition-all duration-300 flex flex-col`}
      >
        {/* Logo and header */}
        <div className="flex items-center justify-start gap-2 px-5 pt-4 mb-4 shrink-0">
          <Logo />
          {!collapsed && <p className="text-lg font-bold">Movie App</p>}
        </div>

       
        <nav className="flex-1 overflow-auto px-5 space-y-2 pb-4">
          {loading
            ? Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-6 mb-5 rounded-full bg-gray-700 animate-pulse w-full"
                ></div>
              ))
            : (
              <>
                {/* "All" option to fetch all data */}
                <div
                  key="all"
                  onClick={() => handleTypeClick('')}  // Send empty string to fetch all types
                  className={`flex items-center gap-3 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                    activeType === '' 
                      ? 'bg-red-500 text-white' 
                      : 'hover:bg-red-500 hover:text-white'
                  }`}
                >
                  {!collapsed && <span>All</span>}
                </div>

                {/* List all title types */}
                {titleTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => handleTypeClick(type)}
                    className={`flex items-center gap-3 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                      activeType === type
                        ? 'bg-red-500 text-white'
                        : 'hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    {!collapsed && <span>{type}</span>}
                  </div>
                ))}
              </>
            )}
        </nav>
      </div>

      {/* Collapse/Expand toggle button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute top-3 left-[calc(100%+4px)] z-20 border-2 bg-black border-slate-800 p-2 rounded-lg text-white shadow cursor-pointer"
      >
        {collapsed ? (
          <IoIosArrowBack className="rotate-180" />
        ) : (
          <IoIosArrowBack />
        )}
      </button>
    </aside>
  );
};

export default SideBar;
