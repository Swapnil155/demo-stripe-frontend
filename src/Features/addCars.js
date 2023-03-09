import { createSlice } from "@reduxjs/toolkit";

export const addCarsSlice = createSlice({
  name: "Cars",
  initialState: {
    count: 0,
    list: [],
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
  },
});

export const { AddCars, removeCar } = addCarsSlice.actions;
export default addCarsSlice.reducer;
