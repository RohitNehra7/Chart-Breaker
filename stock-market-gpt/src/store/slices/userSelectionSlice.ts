import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSelection } from '../../interfaces/userSelection.interface';

interface UserSelectionState {
  selection: UserSelection;
  loading: boolean;
  error: string | null;
}

const initialState: UserSelectionState = {
  selection: { selectedTheme: 'light' },
  loading: false,
  error: null,
};

const userSelectionSlice = createSlice({
  name: 'userSelection',
  initialState,
  reducers: {
    setUserSelection: (state, action: PayloadAction<UserSelection>) => {
      state.selection = action.payload;
    },
    clearUserSelection: (state) => {
      state.selection = { selectedTheme: 'light' }; // or any default value that matches UserSelection
    },
    setSelectedTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.selection.selectedTheme = action.payload;
    },
    setSymbolSelected: (state, action: PayloadAction<string>) => {
      state.selection.symbolSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers if needed for async actions
  },
});

export const {
  setUserSelection,
  clearUserSelection,
  setSelectedTheme,
  setSymbolSelected,
} = userSelectionSlice.actions;

export const selectUserSelection = (state: { userSelection: UserSelectionState }) =>
  state.userSelection.selection;

export const selectSelectedTheme = (state: { userSelection: UserSelectionState }) =>
  state.userSelection.selection.selectedTheme;

export const selectSymbolSelected = (state: { userSelection: UserSelectionState }) =>
  state.userSelection.selection.symbolSelected;

export default userSelectionSlice.reducer;