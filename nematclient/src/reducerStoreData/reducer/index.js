import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "../../slices/profileSlice";

 const rootReducer = combineReducers({
   profile : profileSlice
})

export default rootReducer;