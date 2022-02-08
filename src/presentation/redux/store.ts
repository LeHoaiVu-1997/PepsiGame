import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authorized from './slices/authorized';
import authentication from './slices/authentication';
import {applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {getUserEpic} from './epics/signInEpic';

const epicMiddleware = createEpicMiddleware();
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

export const store = configureStore({
  reducer: {
    authorized: authorized,
    authentication: authentication,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(epicMiddleware),
});

epicMiddleware.run(getUserEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
