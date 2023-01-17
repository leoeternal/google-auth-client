import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./CitySlice";
import userSlice from "./UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    city: citySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
