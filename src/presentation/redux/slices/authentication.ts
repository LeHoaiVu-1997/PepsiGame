import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const INITIAL_STATE = {
  otpConfirmation: null,
  isAuthenticating: false,
  isSigningUp: false,
  isSignUpSuccessful: false,
  isRequestingOtp: false,
  isVeryfingOtp: false,
  verifyOtpFailureNote: '',
  isUserConfirmed: false,
  isOtpValid: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: INITIAL_STATE,
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
    },
    signInSuccess: state => {
      state.isAuthenticating = false;
      state.isUserConfirmed = true;
    },
    signInFailed: state => {
      state.isAuthenticating = false;
      state.isUserConfirmed = false;
      Alert.alert('Đăng nhập không thành công!');
    },
    signUpBegin: state => {
      state.isSigningUp = true;
    },
    signUpSuccess: state => {
      state.isSigningUp = false;
      state.isSignUpSuccessful = true;
    },
    signUpFailed: state => {
      state.isSigningUp = false;
      Alert.alert('Đăng kí thất bại!');
    },
    resetIsSginUpSuccessful: state => {
      state.isSignUpSuccessful = false;
    },
    requestOtpBegin: state => {
      state.isRequestingOtp = true;
    },
    requestOtpSuccess: (state, action: PayloadAction<any>) => {
      state.isRequestingOtp = false;
      state.otpConfirmation = action.payload.otp_confirmation;
    },
    requestOtpFailed: state => {
      state.isRequestingOtp = false;
      Alert.alert('Không nhận được otp confirmation');
    },
    verifyOtpBegin: state => {
      state.isVeryfingOtp = true;
    },
    verifyOtpSuccess: state => {
      state.isVeryfingOtp = false;
      state.isOtpValid = true;
    },
    verifyOtpFailed: (state, action: PayloadAction<any>) => {
      state.isVeryfingOtp = false;
      state.isOtpValid = false;
      state.verifyOtpFailureNote = action.payload.note;
    },
    resetAllStateAuthentication: () => INITIAL_STATE,
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
  resetIsSginUpSuccessful,
  requestOtpBegin,
  requestOtpFailed,
  requestOtpSuccess,
  verifyOtpBegin,
  verifyOtpFailed,
  verifyOtpSuccess,
  resetAllStateAuthentication,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
