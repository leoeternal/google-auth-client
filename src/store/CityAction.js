import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";
import { userActions } from "./UserSlice";

export const addCity = createAsyncThunk(
  "city/addCity",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/city", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      thunkAPI.dispatch(userActions.updateCitiesArray(data.data.data));
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      }
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);
