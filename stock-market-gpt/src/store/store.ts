import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './slices/stocksSlice';
import indicesReducer from './slices/indicesSlice';

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    indices: indicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
