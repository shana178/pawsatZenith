import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import petReducer from "./petSlice"; // ✅ Ensure petSlice is imported

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Ensure consistency with `user` slice
    pets: petReducer, 
  },
  preloadedState: {
    user: {
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || null, // ✅ Ensure state is restored
    },
  },
});

export default store;
