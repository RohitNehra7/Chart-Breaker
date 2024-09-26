import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSelection } from '../../interfaces/userSelection.interface';

interface UserSelectionState {
  selection: UserSelection | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserSelectionState = {
  selection: null,
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
      state.selection = null;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers if needed for async actions
  },
});

export const {
  setUserSelection,
  clearUserSelection,
} = userSelectionSlice.actions;

export const selectUserSelection = (state: { userSelection: UserSelectionState }) =>
  state.userSelection;

export default userSelectionSlice.reducer;