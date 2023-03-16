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
export const getlogin = createAsyncThunk(
  "user/getlogin",
  async ({ email, password }, { rejectWithValue }) => {
    const userdata = await UserServices.userLogin(email, password).then(
      (res) => {
        if (res.status === 200) {
          return res.data;
        }
        return rejectWithValue(res.data.Error[0]);
      }
    );
    return userdata;
  }
);

export const getRegister = createAsyncThunk(
  "user/getRegister",
  async ({ name, mobileNumber, email, password }, { rejectWithValue }) => {
    const userdata = await UserServices.userRegister(
      name,
      mobileNumber,
      email,
      password
    ).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return rejectWithValue(res.data.Error[0]);
    });
    return userdata;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    value: 0,
    prices: 0,
    loading: false,
    serverFailed: null,
    serverSuccess: null,
    userData: null,
    userRegiter: null,
    isAuthenticated: false,
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
    resetError: (state, action) => {
      state.serverFailed = null;
    },
    resetSuccess: (state, action) => {
      state.serverSuccess = null;
    },
    userAuthenticate: (state, action) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
  extraReducers: {
    [getlogin.pending]: (state, action) => {
      state.loading = true;
    },
    [getlogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.serverSuccess = action.payload.message;
      state.isAuthenticated = true;
    },
    [getlogin.rejected]: (state, action) => {
      state.loading = false;
      state.serverFailed = action.payload;
    },
    // User Regiter
    [getRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [getRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.userRegiter = action.payload;
      state.userData = action.payload;
      state.serverSuccess = action.payload.message;
    },
    [getRegister.rejected]: (state, action) => {
      state.loading = false;
      state.serverFailed = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  resetError,
  resetSuccess,
  userAuthenticate,
} = userSlice.actions;
export default userSlice.reducer;
