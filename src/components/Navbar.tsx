import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useMovies } from '../context/MovieContext';
import { MdOutlineClose } from "react-icons/md";

interface TitleTypesResponse {
  results: (string | null)[]; 
}

const LOCAL_STORAGE_KEY = 'activeTitleType';

const Navbar = () => {
  const { setTitleType } = useMovies();
  const [collapsed, setCollapsed] = useState(false);
  const [titleTypes, setTitleTypes] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedType = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
    setActiveType(storedType);
    setTitleType(storedType);

    const fetchTitleTypes = async () => {
      const options = {
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/titles/utils/titleTypes`,
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,  // Replace with your actual key
          'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
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
  }, [setTitleType]);

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
    <nav className="py-2">
     
      <div className="md:flex justify-center hidden">
        <SearchBar />
      </div>

      
      <div className="md:hidden py-4 fixed top-0 left-0 right-0 z-50 bg-black px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="font-bold">Movie APP</p>
        </div>

        <div>
          
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="text-white"
          >
            {collapsed ? (
              
              <MdOutlineClose className='text-xl'/>
            ) : (
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>


      {collapsed && (
        <div className="fixed md:hidden top-0 left-0 right-0 bg-black bg-opacity-80 z-40 pt-16">
          <div className="w-full bg-black text-white p-5">
            <SearchBar />

            <div className="pt-5">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 mb-4 w-1/3"></div>
                  <div className="h-6 bg-gray-700 mb-4 w-1/3"></div>
                </div>
              ) : (
                <div className='h-36 overflow-auto'>
                  <div
                    key="all"
                    onClick={() => handleTypeClick('')}
                    className={`flex items-center gap-3 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                      activeType === ''
                        ? 'bg-red-500 text-white'
                        : 'hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <span>All</span>
                  </div>
                  {titleTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => handleTypeClick(type)}
                      className={`flex items-center gap-3 my-2 cursor-pointer py-0.5 px-2 rounded transition-colors ${
                        activeType === type
                          ? 'bg-red-500 text-white'
                          : 'hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
