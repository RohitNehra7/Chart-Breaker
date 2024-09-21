import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StockMetadata } from '../../interfaces/equityData.interface';
import { fetchAllStockList } from '../../services/stockService';

interface StocksState {
  stocks: StockMetadata[];
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  stocks: [],
  loading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  return await fetchAllStockList();
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stocks';
      });
  },
});

export const selectStocks = (state: { stocks: StocksState }) => state.stocks;

export default stocksSlice.reducer;
