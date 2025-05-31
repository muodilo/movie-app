import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import movieServices from "./moviesServices";
import type { Movie, MovieState } from "../../types/types";

interface SearchQuery {
  keyword: string;
  activeGenre: string | null;
}


const initialState: MovieState = {
  movies: [],
  genres: [],

  getMoviesLoading: false,
  getMoviesError: false,
  getMoviesErrorMessage: "",
  getMoviesSuccess: false,

  searchMovieError: false,
  searchMovieErrorMessage: "",

  getGenresLoading: false,
  getGenresError: false,
  getGenresErrorMessage: "",
  getGenresSuccess: false,
};

export const getMovies = createAsyncThunk<Movie[], string>(
  "movie/getMovies",
  async (page: string, thunkAPI) => {
    try {
      return await movieServices.getMovies(page);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchMovies = createAsyncThunk<Movie[], SearchQuery>(
  "movie/searchMovie",
  async ({keyword,activeGenre}, thunkAPI) => {
    try {
      return await movieServices.searchMovies(keyword,activeGenre);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMovieGenres = createAsyncThunk<(string | null)[]>(
  "movie/getMovieGenres",
  async (_, thunkAPI) => {
    try {
      return await movieServices.getMovieGenres();
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMovie: (state) => {
      state.getMoviesLoading = false;
      state.getMoviesError = false;
      state.getMoviesErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.getMoviesLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.getMoviesLoading = false;
        state.getMoviesSuccess = true;
        state.getMoviesError = false;
        state.getMoviesErrorMessage = "";
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
        state.getMoviesLoading = false;
        state.getMoviesError = true;
        state.getMoviesErrorMessage = action.payload;
      })

      .addCase(searchMovies.pending, (state) => {
        state.getMoviesLoading = true;
      })
      .addCase(
        searchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.getMoviesLoading = false;
          state.getMoviesSuccess = true;
          state.searchMovieError = false;
          state.searchMovieErrorMessage = "";
          state.movies = action.payload;
        }
      )
      .addCase(searchMovies.rejected, (state, action: PayloadAction<any>) => {
        state.getMoviesLoading = false;
        state.getMoviesError = true;
        state.searchMovieErrorMessage = action.payload;
      })
      .addCase(getMovieGenres.pending,(state)=>{
        state.getGenresLoading = true;
      })
      .addCase(getMovieGenres.fulfilled,(state,action)=>{
        state.getGenresLoading=false;
        state.getGenresSuccess= true;
        state.getGenresError=false;
        state.genres = action.payload;
        state.getGenresErrorMessage='';
      })
      .addCase(getMovieGenres.rejected,(state,action: PayloadAction<any>)=>{
        state.getGenresLoading = false;
        state.getGenresError = true;
        state.getGenresErrorMessage= action.payload;
      })
      

  },
});

export const { resetMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
