// src/slices/accountsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accounts: [],
};

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        addAccount: (state, action) => {
            state.accounts.push(action.payload);
        },
        updateAccount: (state, action) => {
            const { accountId, updates } = action.payload;
            const account = state.accounts.find((account) => account.id === accountId);
            if (account) {
                Object.assign(account, updates);
            }
        },
        removeAccount: (state, action) => {
            state.accounts = state.accounts.filter((account) => account.id !== action.payload);
        },
    },
});

export const selectAccountByNumber = (state, accountNum) => {
    state.account.accounts.find((account) => account.accountNumber == accountNum);

}

export const { setAccounts, addAccount, updateAccount, removeAccount } = accountsSlice.actions;


export default accountsSlice.reducer;
