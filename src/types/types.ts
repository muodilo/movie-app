export interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
  ratingsSummary?: { aggregateRating: string };
}

export interface TitlesResponse {
  results: (string | null)[];
}
export interface MovieApiResponse {
  results: Movie[];
}

export interface MovieState {
  movies: Movie[];
  genres: (string | null)[];
  getMoviesLoading: boolean;
  getMoviesError: boolean;
  getMoviesErrorMessage: string;
  getMoviesSuccess: boolean;
  searchMovieError: boolean;
  searchMovieErrorMessage: string;
  getGenresLoading: boolean;
  getGenresError: boolean;
  getGenresErrorMessage: string;
  getGenresSuccess: boolean;
}
