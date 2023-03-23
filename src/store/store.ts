import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './workers';

export const store = configureStore({
  reducer: {
    workersReducer: workersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;