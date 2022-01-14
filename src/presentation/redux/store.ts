import {configureStore} from '@reduxjs/toolkit';
import authorized from './slices/authorized';

export const store = configureStore({
  reducer: {
    authorized: authorized,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
