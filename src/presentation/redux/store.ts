import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authorized from './slices/authorized';
import authentication from './slices/authentication';
import {createEpicMiddleware} from 'redux-observable';
import {getUserEpic, signUpEpic, rootEpic} from './epics/authentication.epics';

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

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
