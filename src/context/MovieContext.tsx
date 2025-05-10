import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
}


interface MovieApiResponse {
  results: Movie[];
}

// Make titleType optional in context type
interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  titleType?: string;
  setTitleType: (type?: string) => void;
}


const MovieContext = createContext<MovieContextType>({
  movies: [],
  loading: false,
  error: null,
  page: 1,
  setPage: () => {},
  titleType: undefined,
  setTitleType: () => {},
});

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [titleType, setTitleType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          page: page.toString(),
          list: 'most_pop_series'
        };

        
        if (titleType) {
          params.titleType = titleType;
        }

        const response = await axios.request<MovieApiResponse>({
          method: 'GET',
          url: `${import.meta.env.VITE_BASE_URL}/titles`,
          params,
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        });

        setMovies(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, titleType]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        page,
        setPage,
        titleType,
        setTitleType,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
