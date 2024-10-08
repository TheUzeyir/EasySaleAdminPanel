import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const createComponents = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.value = action.payload;
    },
    addComponents: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setInputValue, addComponents } = createComponents.actions;
export default createComponents.reducer;