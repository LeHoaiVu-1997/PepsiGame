import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    confirm: null,
    isAuthenticating: false,
    isSigningUp: false,
    isUserConfirmed: false,
  },
  reducers: {
    saveConfirm: (state, action: PayloadAction<any>) => {
      state.confirm = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<any>) => {
      state.isAuthenticating = action.payload.isAuthenticating;
    },
    setIsUserConfirmed: (state, action: PayloadAction<any>) => {
      state.isUserConfirmed = action.payload.isUserConfirmed;
    },
    signInBegin: state => {
      state.isAuthenticating = true;
      console.log('sign in begin');
    },
    signInSuccess: state => {
      state.isAuthenticating = false;
      state.isUserConfirmed = true;
      console.log('sign in success');
    },
    signInFailed: state => {
      state.isAuthenticating = false;
      state.isUserConfirmed = false;
      console.log('sign in failed');
    },
  },
});

export const {
  saveConfirm,
  setIsAuthenticating,
  setIsUserConfirmed,
  signInBegin,
  signInFailed,
  signInSuccess,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
