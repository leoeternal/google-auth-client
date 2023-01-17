import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addCity } from "./CityAction";

const initialState = {
  cityButtonLoader: false,
  cityAdded: false,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    updateCityAddedValue: (state, action) => {
      state.cityAdded = false;
    },
  },
  extraReducers: {
    [addCity.pending]: (state, action) => {
      console.log("pending");
      state.cityButtonLoader = true;
    },
    [addCity.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.cityAdded = true;
      }
      state.cityButtonLoader = false;
    },
    [addCity.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.cityButtonLoader = false;
    },
  },
});

export const cityActions = citySlice.actions;
export default citySlice;
