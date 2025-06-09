import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit'
import movieReducer from '../features/movies/moviesSlice'
import watchlistReducer from '../features/watchlist/watchlistSlice'
import reviewReducer from '../features/reviews/reviewsSlice'
import themeReducer from '../features/theme/themeSlice'

const persistConfig = {
    key:'root',
    version:1,
    storage
}

const rootReducer = combineReducers({
     movie:movieReducer,
     watchlist:watchlistReducer,
     reviews:reviewReducer,
     theme:themeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer:persistedReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;