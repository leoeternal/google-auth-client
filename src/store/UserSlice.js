import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  loginUserWithGoogleAuth,
} from "./UserAction";

const initialState = {
  buttonLoader: false,
  screenLoader: false,
  userRegistered: false,
  errors: [],
  userData: {},
  userLoggedIn: localStorage.getItem("token") === null ? false : true,
  authError: false,
  cityAdded: false,
  cities: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserRegisteredValue: (state, action) => {
      state.userRegistered = false;
    },
    updateErrorsValue: (state, action) => {
      state.errors = [];
    },
    updateAuthErrorValue: (state, action) => {
      state.authError = false;
    },
    userAuthError: (state, action) => {
      localStorage.removeItem("token");
      state.userLoggedIn = false;
      state.authError = true;
    },
    updateCitiesArray: (state, action) => {
      state.cities.push(action.payload);
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      console.log("pending");
      state.buttonLoader = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.userRegistered = true;
      } else if (action.payload.status === 400) {
        state.errors = action.payload.data.data;
      } else if (action.payload.status === 500) {
        state.errors = [];
      }
      state.buttonLoader = false;
    },
    [registerUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.errors = [];
      state.buttonLoader = false;
    },
    [loginUser.pending]: (state, action) => {
      console.log("pending");
      state.buttonLoader = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.userLoggedIn = true;
        state.userData = action.payload.data.data.user;
        localStorage.setItem("token", action.payload.data.data.token);
      } else if (action.payload.status === 400) {
        state.errors = action.payload.data.data;
      } else if (
        action.payload.status === 500 ||
        action.payload.status === 404
      ) {
        state.errors = [];
      }
      state.buttonLoader = false;
    },
    [loginUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.errors = [];
      state.buttonLoader = false;
    },
    [loginUserWithGoogleAuth.pending]: (state, action) => {
      console.log("pending");
      state.buttonLoader = true;
    },
    [loginUserWithGoogleAuth.fulfilled]: (state, action) => {
      if (action.payload.status === 201 || action.payload.status === 200) {
        state.userLoggedIn = true;
        state.userData = action.payload.data.data.user;
        localStorage.setItem("token", action.payload.data.data.token);
      }
      state.buttonLoader = false;
    },
    [loginUserWithGoogleAuth.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.buttonLoader = false;
    },
    [logoutUser.pending]: (state, action) => {
      console.log("pending");
      state.buttonLoader = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.userLoggedIn = false;
      if (action.payload.status === 204) {
        localStorage.removeItem("token");
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        state.authError = true;
      }
      state.buttonLoader = false;
    },
    [logoutUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.buttonLoader = false;
    },
    [getUserInfo.pending]: (state, action) => {
      console.log("pending");
      state.screenLoader = true;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.userData = action.payload.data.data[0]._id;
        state.cities = action.payload.data.data[0].cities;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        state.userLoggedIn = false;
        state.authError = true;
      }
      state.screenLoader = false;
    },
    [getUserInfo.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.screenLoader = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
