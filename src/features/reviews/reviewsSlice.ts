import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';

export interface Review {
  name: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface ReviewsState {
  data: {
    [movieId: string]: Review[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  data: {},
  loading: false,
  error: null,
};

// Async thunk to fetch reviews from Firebase
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (movieId: string) => {
    const docRef = doc(db, 'reviews', movieId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const reviews = docSnap.data().reviews as Review[];
      return { movieId, reviews };
    } else {
      return { movieId, reviews: [] };
    }
  }
);

// Async thunk to add a review to Firebase
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ movieId, review }: { movieId: string; review: Review }) => {
    const docRef = doc(db, 'reviews', movieId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        reviews: arrayUnion(review),
      });
    } else {
      await setDoc(docRef, { reviews: [review] });
    }

    return { movieId, review };
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { movieId, reviews } = action.payload;
        state.loading = false;
        state.data[movieId] = reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      })

      // Add review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { movieId, review } = action.payload;
        state.loading = false;
        if (!state.data[movieId]) {
          state.data[movieId] = [];
        }
        state.data[movieId].push(review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add review';
      });
  },
});

export default reviewsSlice.reducer;
