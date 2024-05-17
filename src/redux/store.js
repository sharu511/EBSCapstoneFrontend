import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/userSlice'
import beneficiaryReducer from './features/beneficiarySlice'
import accountReducer from './features/accountSlice'
import transactionReducer from './features/transactionSlice'
import fdReducer from './features/fdSlice'



export default configureStore({
    reducer: {

        user: userReducer,
        account: accountReducer,
        transactions: transactionReducer,
        beneficiaries: beneficiaryReducer,
        fds: fdReducer


    },
})