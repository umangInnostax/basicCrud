import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice.jsx";

export const store = configureStore({
    reducer: userSlice
})