import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState: {
    user: {
      play_time_exchange: 0,
      play_time_free: 0,
      name: '',
      phone_number: '',
      collection: null,
    },
    current_play_type: '', // get value either "exchange" or "free"
    name: '',
    phone_number: '',
    reward: null,
    is_getting_reward: false,
    isUpdatingUser: false,
    isExchangingCombo: false,
    exchange_combo_result: [],
  },
  reducers: {
    incrementExchange: state => {
      state.user.play_time_exchange += 1;
    },
    decrementExchange: state => {
      if (state.user.play_time_exchange > 0) {
        state.user.play_time_exchange -= 1;
      }
    },
    incrementFree: state => {
      state.user.play_time_free += 1;
    },
    decrementFree: state => {
      if (state.user.play_time_free > 0) {
        state.user.play_time_free -= 1;
      }
    },
    setPlayType: (state, action: PayloadAction<string>) => {
      state.current_play_type = action.payload;
    },
    saveUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    updateUserBegin: state => {
      state.isUpdatingUser = true;
    },
    updateUserSuccess: (state, action: PayloadAction<any>) => {
      state.isUpdatingUser = false;
      state.user = action.payload;
    },
    updateUserFailed: state => {
      state.isUpdatingUser = false;
    },
    getRewardBegin: state => {
      state.is_getting_reward = true;
    },
    getRewardSuccess: (state, action: PayloadAction<any>) => {
      state.reward = action.payload;
      state.is_getting_reward = false;
    },
    getRewardFailed: state => {
      state.is_getting_reward = false;
      state.reward = null;
    },
    resetReward: state => {
      state.reward = null;
    },
    exchangeComboBegin: state => {
      state.isExchangingCombo = true;
    },
    exchangeComboSuccess: (state, action: PayloadAction<any>) => {
      state.isExchangingCombo = false;
      state.exchange_combo_result = action.payload;
      console.log('action payload: ', action.payload);
    },
    exchangeComboFailed: state => {
      state.isExchangingCombo = false;
      state.exchange_combo_result = [];
    },
    resetExchangeComboResult: state => {
      state.exchange_combo_result = [];
    },
  },
});

export const {
  incrementExchange,
  decrementExchange,
  incrementFree,
  decrementFree,
  setPlayType,
  saveUser,
  getRewardBegin,
  getRewardSuccess,
  getRewardFailed,
  resetReward,
  updateUserBegin,
  updateUserSuccess,
  updateUserFailed,
  exchangeComboBegin,
  exchangeComboSuccess,
  exchangeComboFailed,
  resetExchangeComboResult,
} = authorizedSlice.actions;
export default authorizedSlice.reducer;
