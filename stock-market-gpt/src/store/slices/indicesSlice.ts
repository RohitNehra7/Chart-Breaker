import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MarketIndexData } from '../../interfaces/marketIndex.interface';
import { fetchAllIndicesList } from '../../services/stockService';

interface IndicesState {
  indices: MarketIndexData[];
  loading: boolean;
  error: string | null;
}

const initialState: IndicesState = {
  indices: [],
  loading: false,
  error: null,
};

export const fetchIndices = createAsyncThunk(
  'indices/fetchIndices',
  async () => {
    return await fetchAllIndicesList();
  }
);

const indicesSlice = createSlice({
  name: 'indices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndices.fulfilled, (state, action) => {
        state.loading = false;
        state.indices = action.payload;
      })
      .addCase(fetchIndices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch indices';
      });
  },
});

export const selectIndices = (state: { indices: IndicesState }) =>
  state.indices;

export default indicesSlice.reducer;
