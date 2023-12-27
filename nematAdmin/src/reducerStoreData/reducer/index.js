import { combineReducers } from "@reduxjs/toolkit";
import AdminProfileSlice from "../../slice/AdminProfileSlice";

const rootReducer = combineReducers({
  profile: AdminProfileSlice,
});

export default rootReducer;
