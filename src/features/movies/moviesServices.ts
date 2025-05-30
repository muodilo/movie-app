import axios from 'axios';
import type { Movie } from './moviesSlice'; // Ensure correct path

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

const movieServices = {
  getMovies,
};

export default movieServices;
