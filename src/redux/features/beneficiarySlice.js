// src/slices/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    beneficiaries: [],
};

const beneficiariesSlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers: {
        addBeneficiary: (state, action) => {
            state.beneficiaries.push(action.payload);
        },
        setBeneficiaries: (state, action) => {
            state.beneficiaries = action.payload;
        },
    },
});


export const { addBeneficiary, setBeneficiaries } = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;

