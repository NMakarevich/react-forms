import { createSelector, createSlice } from '@reduxjs/toolkit';
import { countries } from '@shared/helpers/constants.ts';
import { RootState } from '@shared/store/store.ts';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

const selectCountriesSlice = (state: RootState) => state.countries;

export const selectCountries = createSelector(
  selectCountriesSlice,
  (state) => state.countries
);

export default countriesSlice.reducer;
