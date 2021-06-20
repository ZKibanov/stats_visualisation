import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SortedByRegion, ShortCountryInfo } from '../types'
import type { RootState } from './store'

/* eslint-disable no-param-reassign */
// Define a type for the slice state
interface CountriesState {
  countries:SortedByRegion;
}

// Define the initial state using that type
const initialState: CountriesState = {
  countries: {}
}

export const counterSlice = createSlice({
  name: 'countriesInfo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    manageCountriesList: (state, action: PayloadAction<SortedByRegion>) => {
      state.countries = {...action.payload}
    }
  }
})

export const { manageCountriesList } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCountry = (state: RootState) => state.data.countries

export default counterSlice.reducer