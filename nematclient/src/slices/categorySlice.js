import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryData: [],
}

const categorySlice = createSlice({
   name:"category",
   initialState:initialState,
   reducers:{
    setCategoryDataStore(state , value){
         state.categoryData = value.payload
      },
   }
})


export const { setCategoryDataStore  } = categorySlice.actions
export default categorySlice.reducer