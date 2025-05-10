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

interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  titleType?: string;
  setTitleType: (type?: string) => void;
  keyword?: string;
  setKeyword: (keyword?: string) => void;
}

const MovieContext = createContext<MovieContextType>({
  movies: [],
  loading: false,
  error: null,
  page: 1,
  setPage: () => {},
  titleType: undefined,
  setTitleType: () => {},
  keyword: undefined,
  setKeyword: () => {},
});

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [titleType, setTitleType] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_BASE_URL}/titles`;
        const params: Record<string, string> = {
          page: page.toString(),
        };

        if (keyword) {
          // Format the keyword: lowercase and replace spaces with hyphens
          const formattedKeyword = keyword.toLowerCase().replace(/\s+/g, '-');
          url = `${import.meta.env.VITE_BASE_URL}/titles/search/keyword/${formattedKeyword}`;
          params.exact = 'true';
        } else {
          // Default to popular series list if no keyword is provided
          params.list = 'most_pop_series';
        }

        if (titleType) {
          params.titleType = titleType;
        }

        const response = await axios.request<MovieApiResponse>({
          method: 'GET',
          url,
          params,
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        });

        setMovies(response.data.results);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, titleType, keyword]);

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
        keyword,
        setKeyword,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
