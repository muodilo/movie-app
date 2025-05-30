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
  searchMovieError:boolean;
  searchMovieErrorMessage:string;
}


const initialState: MovieState = {
    movies:[],
    getMoviesLoading:false, 
    getMoviesError:false,
    getMoviesErrorMessage:'',
    getMoviesSuccess:false,
    searchMovieError:false,
    searchMovieErrorMessage:''
}

export const getMovies = createAsyncThunk<Movie[], string>('movie/getMovies',async(page:string,thunkAPI)=>{
    try {
        return await movieServices.getMovies(page);
    } catch (error:any) {
        const message:string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const searchMovies = createAsyncThunk<Movie[], string>('movie/searchMovie',async(keyword:string,thunkAPI)=>{
    try {
        return await movieServices.searchMovies(keyword)
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
            state.getMoviesError=true;
            state.getMoviesErrorMessage = action.payload
        })

        
        .addCase(searchMovies.pending,(state)=>{
            state.getMoviesLoading = true;
        })
        .addCase(searchMovies.fulfilled,(state,action: PayloadAction<Movie[]>)=>{
            state.getMoviesLoading = false;
            state.getMoviesSuccess = true;
            state.searchMovieError=false;
            state.searchMovieErrorMessage='';
            state.movies = action.payload
        })
        .addCase(searchMovies.rejected,(state,action: PayloadAction<any>)=>{
            state.getMoviesLoading=false;
            state.getMoviesError=true;
            state.searchMovieErrorMessage = action.payload
        })


    }

})

export const {resetMovie} = moviesSlice.actions;
export default moviesSlice.reducer