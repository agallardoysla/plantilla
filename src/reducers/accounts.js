import {createSlice} from '@reduxjs/toolkit';

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: [],
  reducers: {
    addAccount: (accounts, action) => {
      console.log('accounts: ', action.payload);
      accounts = [...accounts, action.payload];
      return accounts;
    },
    setAccounts: (accounts, action) => {
      console.log('accounts: ', action.payload);
      accounts = action.payload;
      return accounts;
    },
    resetAccounts: (accounts) => {
      accounts = [];
      return accounts;
    },
  },
});

export const {
  addAccount,
  setAccounts,
  resetAccounts,
} = accountsSlice.actions;

export const getAccounts = (state) => state.accounts;

export default accountsSlice.reducer;
