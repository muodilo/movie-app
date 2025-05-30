import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction } from '@reduxjs/toolkit'
import movieServices from "./moviesServices";

export interface Movie {
  id: string;
  titleText: { text: string };
  primaryImage?: { url: string };
  releaseYear: { year: number };
  ratingsSummary?: { aggregateRating: string };
}

interface MovieState {
  movies: Movie[];
  getMoviesLoading: boolean;
  getMoviesError: boolean;
  getMoviesErrorMessage: string;
  getMoviesSuccess: boolean;
}


const initialState: MovieState = {
    movies:[],
    getMoviesLoading:false,
    getMoviesError:false,
    getMoviesErrorMessage:'',
    getMoviesSuccess:false,
}

export const getMovies = createAsyncThunk<Movie[], string>('movie/getMovies',async(page:string,thunkAPI)=>{
    try {
        return await movieServices.getMovies(page);
    } catch (error:any) {
        const message:string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})
export const moviesSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{
        resetMovie:(state)=>{
            state.getMoviesLoading = false;
            state.getMoviesError = false;
            state.getMoviesErrorMessage="";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMovies.pending,(state)=>{
            state.getMoviesLoading = true;
        })
        .addCase(getMovies.fulfilled,(state,action: PayloadAction<Movie[]>)=>{
            state.getMoviesLoading = false;
            state.getMoviesSuccess = true;
            state.getMoviesError=false;
            state.getMoviesErrorMessage='';
            state.movies = action.payload
        })
        .addCase(getMovies.rejected,(state,action: PayloadAction<any>)=>{
            state.getMoviesLoading=false;
            state.getMoviesSuccess= true;
            state.getMoviesError=true;
            state.getMoviesErrorMessage = action.payload
        })
    }

})

export const {resetMovie} = moviesSlice.actions;
export default moviesSlice.reducer