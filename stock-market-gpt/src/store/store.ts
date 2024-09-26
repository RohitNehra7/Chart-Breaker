import { configureStore } from '@reduxjs/toolkit';
import indicesReducer from './slices/indicesSlice';
import userSelectionReducer from './slices/userSelectionSlice'; // Import the userSelection reducer

const store = configureStore({
  reducer: {
    indices: indicesReducer,
    userSelection: userSelectionReducer, // Add the userSelection reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;