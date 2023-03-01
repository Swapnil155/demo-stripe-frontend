import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        value: 0,
        prices: 0,
        priceArr: [4.95, 4.50, 4.00, 3.50, 3.00, 2.50, 2.00, 1.50]
    },
    reducers: {
        increment: (state, action) => {
            // write code for increment
            state.value += 1
            state.prices = state.priceArr[state.value - 1] * state.value
            if (state.priceArr.length < state.value) {
                state.prices = 1.5 * state.value
            }

        },
        decrement: (state, action) => {
            // write code for decrement

            state.value -= 1
            if (state.value === -1) {
                state.value = 0
                state.prices = 0
            }
            state.prices = state.priceArr[state.value - 1] * state.value
            if (state.priceArr.length < state.value) {
                state.prices = 1.5 * state.value
            }
        }
    }
})

export const { increment, decrement } = userSlice.actions
export default userSlice.reducer