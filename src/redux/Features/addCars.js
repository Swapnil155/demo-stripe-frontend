import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MemberServices from "../../services/memberServices";
import TokenService from "../../services/tokenService";
import { userAuthenticate } from "./User";

export const createMember = createAsyncThunk(
  "member/createMember",
  async ({ DOB, VRN, gender, ownername }, { rejectWithValue, dispatch }) => {
    const user = TokenService.getUser();
    console.log(user && user.user._id);
    const _id = user && user.user._id;
    const memberData = await MemberServices.addMember(
      _id,
      ownername,
      DOB,
      gender,
      VRN
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTimeout(() => {
          dispatch(resetSuccess());
        }, 1000);
        return res.data;
      }
      if (res.status === 401) {
        dispatch(userAuthenticate());
      }
      setTimeout(() => {
        dispatch(resetError());
      }, 1000);
      return rejectWithValue(res.data);
    });
    return memberData;
  }
);

export const removeMember = createAsyncThunk(
  "member/removeMember",
  async (VRN, { rejectWithValue, dispatch }) => {
    const user = TokenService.getUser();
    console.log(user && user.user._id);
    const _id = user && user.user._id;
    const memberData = await MemberServices.removeMember(_id, VRN).then(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          setTimeout(() => {
            dispatch(resetSuccess());
          }, 1000);
          return res.data;
        }
        if (res.status === 401) {
          dispatch(userAuthenticate());
        }
        setTimeout(() => {
          dispatch(resetError());
        }, 1000);
        return rejectWithValue(res.data);
      }
    );
    return memberData;
  }
);

export const editMember = createAsyncThunk(
  "member/editMember",
  async ({ DOB, gender, ownername, _id }, { rejectWithValue, dispatch }) => {
    const memberData = await MemberServices.editMember(
      _id,
      ownername,
      DOB,
      gender
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTimeout(() => {
          dispatch(resetSuccess());
        }, 1000);
        return res.data;
      }
      if (res.status === 401) {
        dispatch(userAuthenticate());
      }
      setTimeout(() => {
        dispatch(resetError());
      }, 1000);
      return rejectWithValue(res.data);
    });
    return memberData;
    // console.log(DOB, gender, ownername, _id);
    // return
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
      console.log(action.payload.length);
      state.list = action.payload;
      state.count = action.payload.length;
    },
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
      // console.log(action.payload.data && action.payload.data)
      state.VRNList.push(
        action.payload.data && action.payload.data.registrationNumber
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

    [removeMember.pending]: (state, action) => {
      state.loader = true;
    },
    [removeMember.fulfilled]: (state, action) => {
      state.count -= 1;
      const newList = state.list.filter(
        (elem) => elem.registrationNumber !== action.payload.data.registration
      );
      state.list = newList;
      const newVRNList = state.list.filter(
        (elem) => elem !== action.payload.data.registration
      );
      console.log(action.payload.data && action.payload.data.registration);
      state.VRNList = newVRNList;
      // state.serverFailed = action.payload.message;
      // state.list.push(action.payload.data);
      // // console.log(action.payload.data && action.payload.data)
      // state.VRNList.push(
      //   action.payload.data && action.payload.data.registrationNumber
      // );
      state.serverSuccess = action.payload.message;
      state.loader = false;
    },
    [removeMember.rejected]: (state, action) => {
      state.loader = false;
      state.serverFailed = action.payload.Error[0];
      if (action.payload.data) {
        console.log(action.payload.data);
      }
    },

    // Edit
    [editMember.pending]: (state, action) => {
      state.loader = true;
    },
    [editMember.fulfilled]: (state, action) => {
      // state.serverSuccess = action.payload.message;
      state.loader = false;
    },
    [editMember.rejected]: (state, action) => {
      state.loader = false;
      state.serverFailed = action.payload.Error[0];
      // if (action.payload.data) {
      //   console.log(action.payload.data);
      // }
    },
  },
});

export const { AddCars, resetError, resetSuccess } = addCarsSlice.actions;
export default addCarsSlice.reducer;
