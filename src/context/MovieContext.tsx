import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
}

interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const MovieContext = createContext<MovieContextType>({
  movies: [],
  loading: false,
  error: null,
});

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          url: `${import.meta.env.VITE_BASE_URL}/titles`, 
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, 
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST, 
          },
        };

        const response = await axios.request(options);
        setMovies(response.data.results);
        console.log(movies);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
