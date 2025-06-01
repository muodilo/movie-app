export interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
  ratingsSummary?: { aggregateRating: string };
  plot:{plotText:{plainText:string}};
    releaseDate:{day:string,month:string,year:string};
    runtime:string;
    genres:string;
    titleType:{text:string};
    rating?:string
}

export interface WatchlistMovie {
  id: string;
  title: string;
  imageUrl: string;
  rating?: string;
}


export interface TitlesResponse {
  results: (string | null)[];
}
export interface MovieApiResponse {
  results: Movie[];
}
export interface MovieDetailApiResponse {
  results: Movie;
}

export interface MovieState {
  movies: Movie[];
  genres: (string | null)[];
  movieDetail:Movie;
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
  movieDetailLoading:boolean;
  movieDetailError:boolean;
  movieDetailErrorMessage:string;
  movieDetailSuccess:boolean;
}

export interface WatchlistState {
    watchlist:WatchlistMovie[];
    watchlistLoading:boolean;
    watchlistError:boolean;
    watchlistErrorMessage:string;
    watchlistSuccess:boolean
}