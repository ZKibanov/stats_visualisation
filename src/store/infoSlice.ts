import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
/* eslint-disable no-param-reassign */

// Define the initial state using that type
const initialState = {
  isLoading:false,
  hasError:false
}

export const infoSlice = createSlice({
  name: 'info',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setLoading } = infoSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCountry = (state: RootState) => state.data.countries

export default infoSlice.reducer