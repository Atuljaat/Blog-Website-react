import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../slices/userSlices";

let store = configureStore({
    reducer : UserReducers
})

export default store