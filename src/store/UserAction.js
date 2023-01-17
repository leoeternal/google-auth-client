import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/register", data);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const fetchData = () => {
    const response = axios.post("/login", data);
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const loginUserWithGoogleAuth = createAsyncThunk(
  "user/loginUserWithGoogleAuth",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/login/google/auth", data);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const fetchData = () => {
    const response = axios.get("/logout", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const fetchData = () => {
    const response = axios.get("/user", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
});
