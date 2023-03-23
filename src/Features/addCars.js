import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MemberServices from "../services/memberServices";
import TokenService from "../services/tokenService";

export const createMember = createAsyncThunk(
  "member/createMember",
  async ({ DOB, VRN, gender, ownername }, { rejectWithValue }) => {
    const user = TokenService.getUser();
    console.log(user && user.user._id);
    const _id = user && user.user._id;
    const memberData = await MemberServices.addMember(
      _id,
      ownername,
      18,
      gender,
      VRN
    ).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      console.log(res.data);
      return rejectWithValue(res.data);
    });
    return memberData;
  }
);

export const addCarsSlice = createSlice({
  name: "Cars",
  initialState: {
    count: 0,
    list: [],
    VRNList: [],
    loader: false,
    serverFailed: null,
    serverSuccess: null,
  },
  reducers: {
    AddCars: (state, action) => {
      console.log(action.payload);
      const car = {
        id: Math.random() * 100,
        car: action.payload,
      };
      state.list.push(car);
      state.count += 1;
    },
    removeCar: (state, action) => {},
    resetError: (state, action) => {
      state.serverFailed = null;
    },
    resetSuccess: (state, action) => {
      state.serverSuccess = null;
    },
  },
  extraReducers: {
    [createMember.pending]: (state, action) => {
      state.loader = true;
    },
    [createMember.fulfilled]: (state, action) => {
      state.count += 1;
      state.list.push(action.payload.data);
      // console.log(action.payload.data && action.payload.data.registration)
      state.VRNList.push(
        action.payload.data && action.payload.data.registration
      );
      state.serverSuccess = action.payload.message;
      state.loader = false;
    },
    [createMember.rejected]: (state, action) => {
      state.loader = false;
      state.serverFailed = action.payload.Error[0];
      if (action.payload.data) {
        console.log(action.payload.data);
      }
    },
  },
});

export const { AddCars, removeCar, resetError, resetSuccess } =
  addCarsSlice.actions;
export default addCarsSlice.reducer;
