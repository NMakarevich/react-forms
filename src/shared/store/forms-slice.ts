import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/store/store.ts';
import { IForm } from '@shared/types.ts';

interface IFormsState {
  controlledForms: IForm[];
  uncontrolledForms: IForm[];
}

const initialState: IFormsState = {
  controlledForms: [],
  uncontrolledForms: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addControlledForm: (state: IFormsState, action: PayloadAction<IForm>) => {
      state.controlledForms.push(action.payload);
    },
    addUncontrolledForm: (state: IFormsState, action: PayloadAction<IForm>) => {
      state.uncontrolledForms.push(action.payload);
    },
  },
});

export const { addControlledForm, addUncontrolledForm } = formsSlice.actions;

const selectFormsSlice = (state: RootState) => state.forms;
export const selectUncontrolledForms = createSelector(
  selectFormsSlice,
  (state) => [...state.uncontrolledForms].reverse()
);
export const selectControlledForms = createSelector(selectFormsSlice, (state) =>
  [...state.controlledForms].reverse()
);

export default formsSlice.reducer;
