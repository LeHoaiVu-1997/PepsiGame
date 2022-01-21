import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authorized from './slices/authorized';
import authentication from './slices/authentication';

export const store = configureStore({
  reducer: {
    authorized: authorized,
    authentication: authentication,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
