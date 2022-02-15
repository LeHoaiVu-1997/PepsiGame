import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    otpConfirmation: null,
    isAuthenticating: false,
    isSigningUp: false,
    isRequestingOtp: false,
    isVeryfingOtp: false,
    verifyOtpFailureNote: '',
    isUserConfirmed: false,
    isOtpValid: false,
  },
  reducers: {
    saveConfirm: (state, action: PayloadAction<any>) => {
      state.otpConfirmation = action.payload;
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
    requestOtpBegin: state => {
      state.isRequestingOtp = true;
      console.log('requestOtpBegin');
    },
    requestOtpSuccess: (state, action: PayloadAction<any>) => {
      state.isRequestingOtp = false;
      state.otpConfirmation = action.payload.otp_confirmation;
      console.log('requestOtpSuccess');
    },
    requestOtpFailed: state => {
      state.isRequestingOtp = false;
      Alert.alert('Không nhận được otp confirmation');
    },
    verifyOtpBegin: state => {
      state.isVeryfingOtp = true;
      console.log('verifyOtpBegin');
    },
    verifyOtpSuccess: state => {
      state.isVeryfingOtp = false;
      state.isOtpValid = true;
      console.log('verifyOtpSuccess');
    },
    verifyOtpFailed: (state, action: PayloadAction<any>) => {
      state.isVeryfingOtp = false;
      state.isOtpValid = false;
      state.verifyOtpFailureNote = action.payload.note;
      console.log('verifyOtpFailed');
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
  requestOtpBegin,
  requestOtpFailed,
  requestOtpSuccess,
  verifyOtpBegin,
  verifyOtpFailed,
  verifyOtpSuccess,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
