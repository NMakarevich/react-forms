import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './countries-slice';
import formsReducer from './forms-slice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
