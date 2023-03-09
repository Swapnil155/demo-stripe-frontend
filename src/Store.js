import { configureStore } from "@reduxjs/toolkit";
import addCarsReducer from "./Features/addCars";
import usersReducer from './Features/User'

const Store = configureStore({
    reducer: {
        users : usersReducer,
        cars : addCarsReducer
    }
})

export default Store