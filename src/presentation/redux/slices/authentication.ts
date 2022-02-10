import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

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
      Alert.alert('Đăng nhập không thành công!');
      console.log('sign in failed');
    },
    signUpBegin: state => {
      state.isSigningUp = true;
      console.log('Sign up begin');
    },
    signUpSuccess: state => {
      state.isSigningUp = false;
      // state.isUserConfirmed = true;
      console.log('Sign up success');
    },
    signUpFailed: state => {
      state.isSigningUp = false;
      // state.isUserConfirmed = false;
      console.log('Sign up failed');

      Alert.alert('Đăng kí thất bại!');
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
  signUpBegin,
  signUpSuccess,
  signUpFailed,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
