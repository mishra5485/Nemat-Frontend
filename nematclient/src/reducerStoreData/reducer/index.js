import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "../../slices/profileSlice";
import categorySlice from "../../slices/categorySlice";

 const rootReducer = combineReducers({
   profile : profileSlice ,
   category : categorySlice
})

export default rootReducer;