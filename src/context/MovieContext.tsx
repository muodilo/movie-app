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
          url: 'https://moviesdatabase.p.rapidapi.com/titles',
          headers: {
            'x-rapidapi-key': '9d133dcac2mshfea44f15c5b3071p192404jsn242a204d21f5',
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        setMovies(response.data.results);
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
