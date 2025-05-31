import axios from 'axios';
import type { Movie ,MovieApiResponse,TitlesResponse} from '../../types/types';



const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const getMovies = async (page: string): Promise<Movie[]> => {
  const activeGenre = localStorage.getItem("activeTitleType");
  const config = {
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
    params: {
      page,
      list: 'most_pop_series',
      info: 'base_info',
      ...(activeGenre && activeGenre !== 'null' && activeGenre !== '' ? { genre: activeGenre } : {})
    },
  };

  const response = await axios.get<MovieApiResponse>(`${BASE_API_URL}/titles`, config);
  return response.data.results;
};

const searchMovies = async (keyword: string,activeGenre:string|null): Promise<Movie[]> => {
  const formattedKeyword = keyword.toLowerCase().replace(/\s+/g, '-');
  const url = `${BASE_API_URL}/titles/search/title/${formattedKeyword}`;
  const params: Record<string, string> = {
    exact: 'false',
    ...(activeGenre && activeGenre !== 'null' && activeGenre !== '' ? { genre: activeGenre } : {})
  };

  const config = {
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
    params
  };

  const response = await axios.get<MovieApiResponse>(url, config);
  return response.data.results;
};

const getMovieGenres = async()=>{
  const url = `${BASE_API_URL}/titles/utils/genres`;
const config={
  headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    },

  }
  const response = await axios.get<TitlesResponse>(url, config);
  return response.data.results;
}



const movieServices = {
  getMovies,
  searchMovies,
  getMovieGenres
};

export default movieServices;
