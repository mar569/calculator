import { configureStore } from '@reduxjs/toolkit';
import financeReducer from './financeSlice';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
});

// Определите типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
