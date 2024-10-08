import { configureStore } from '@reduxjs/toolkit';
import createComponents from './createComponents';

export const store = configureStore({
  reducer: {
    createComponent: createComponents,  
  },
});

export default store;
