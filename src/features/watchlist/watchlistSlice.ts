import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction }from "@reduxjs/toolkit";
import type { WatchlistMovie, WatchlistState } from "../../types/types";


const STORAGE_KEY = "watchlist";

const loadWatchlistFromLocalStorage = (): WatchlistMovie[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load watchlist from localStorage:", error);
    return [];
  }
};

const saveWatchlistToLocalStorage = (watchlist: WatchlistMovie[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Failed to save watchlist to localStorage:", error);
  }
};

const initialState: WatchlistState = {
  watchlist: loadWatchlistFromLocalStorage(),
  watchlistLoading: false,
  watchlistError: false,
  watchlistErrorMessage: "",
  watchlistSuccess: false,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    resetWatchlist: (state) => {
      state.watchlistLoading = false;
      state.watchlistError = false;
      state.watchlistErrorMessage = "";
      state.watchlistSuccess = false;
    },

    addToWatchlist: (state, action: PayloadAction<WatchlistMovie>) => {
      const exists = state.watchlist.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.watchlist.push(action.payload);
        saveWatchlistToLocalStorage(state.watchlist);
        state.watchlistSuccess = true;
      }
    },

    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload);
      saveWatchlistToLocalStorage(state.watchlist);
    },
  },
});

export const { resetWatchlist, addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

// Selectors
export const selectWatchlist = (state: { watchlist: WatchlistState }) =>
  state.watchlist.watchlist;

export const isInWatchlist = (id: string) => (state: { watchlist: WatchlistState }) =>
  state.watchlist.watchlist.some(movie => movie.id === id);

export default watchlistSlice.reducer;
