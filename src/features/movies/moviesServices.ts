import axios from 'axios';
import type { Movie } from './moviesSlice';

interface MovieApiResponse {
  results: Movie[];
}

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const getMovies = async (page: string): Promise<Movie[]> => {
  const config = {
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
    params: {
      page,
      list: 'most_pop_series',
      info: 'base_info',
    },
  };

  const response = await axios.get<MovieApiResponse>(`${BASE_API_URL}/titles`, config);
  return response.data.results;
};

const searchMovies = async (keyword: string): Promise<Movie[]> => {
  const formattedKeyword = keyword.toLowerCase().replace(/\s+/g, '-');
  const url = `${BASE_API_URL}/titles/search/title/${formattedKeyword}`;

  const config = {
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
    params: {
      exact: 'false',
    },
  };

  const response = await axios.get<MovieApiResponse>(url, config);
  return response.data.results;
};

const movieServices = {
  getMovies,
  searchMovies,
};

export default movieServices;
