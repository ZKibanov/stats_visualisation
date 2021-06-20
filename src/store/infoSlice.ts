import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const initialState = {
  isLoading: false,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = infoSlice.actions;

export default infoSlice.reducer;
