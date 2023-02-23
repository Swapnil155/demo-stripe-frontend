import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './Features/User'

const Store = configureStore({
    reducer: {
        users : usersReducer
    }
})

export default Store