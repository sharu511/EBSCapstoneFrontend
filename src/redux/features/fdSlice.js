// src/slices/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fds: [],
};

const fixedDepositsSlice = createSlice({
    name: 'fds',
    initialState,
    reducers: {
        addFD: (state, action) => {
            state.fds.push(action.payload);
        },
        setFD: (state, action) => {
            state.fds = action.payload;
        },
    },
});

export const selectFDsByAccountNumber = (state, accountNumber) =>
    state.fds.fds.filter((fd) => fd.accno === accountNumber);
export const { addFD, setFD } = fixedDepositsSlice.actions;

export default fixedDepositsSlice.reducer;

