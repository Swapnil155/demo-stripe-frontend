import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../services/userServices";

const calculatePrices = (n) => {
  const price = 4.95;
  const dedect = 0.5;
  let result = 4.95;
  if (n !== 0) {
    for (var i = 2; i <= n; i++) {
      let dedected_amount = dedect;
      for (var j = 3; j <= i; j++) {
        dedected_amount += 0.5;
      }
      if (i >= 8) {
        result += 1.5;
      } else {
        result += price - dedected_amount;
      }
    }
    return result;
  } else {
    return 0;
  }
};

export const  getlogin = createAsyncThunk("user/getlogin", async ({value}) => {
  try {
    console.log(value)
    // await UserServices.userLogin(email, password).then((res) => {
    //   console.log(res)
    //   if (res.status === 200) {
    //     return res
    //   }
    //   return res
    // })
  } catch (error) {
    console.log(error)
  }
})

export const userSlice = createSlice({
  name: "users",
  initialState: {
    value: 0,
    prices: 0,
    loading: false,
    error : null,
    user : null,

  },
  reducers: {
    increment: (state, action) => {
      // write code for increment
      state.value += 1;
      const amount = calculatePrices(state.value);
      state.prices = amount.toFixed(2);
    },
    decrement: (state, action) => {
      // write code for decrement
      state.value -= 1;
      if (state.value === -1) {
        state.value = 0;
      }
      const amount = calculatePrices(state.value);
      state.prices = amount.toFixed(2);
    },
  },
  extraReducers : {
    [getlogin.pending] : (state, action) =>{
      state.loading = true
    },
    [getlogin.fulfilled] : (state, action) => {
      state.loading = false
      console.log( action.payload)
      state.user = action.payload
    },
    [getlogin.rejected] : (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
});


export const { increment, decrement } = userSlice.actions;
export default userSlice.reducer ;

