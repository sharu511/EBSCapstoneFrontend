// src/slices/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
    },
});


export const selectTransactionsByAccountNumber = (state, accountNumber) =>
    state.transactions.transactions.filter((transaction) => transaction.transactionAccountNum === accountNumber);


export const { addTransaction, setTransactions } = transactionSlice.actions;


export default transactionSlice.reducer;

