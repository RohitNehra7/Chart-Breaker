import { configureStore } from '@reduxjs/toolkit';
import indicesReducer from './slices/indicesSlice';

const store = configureStore({
  reducer: {
    indices: indicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
