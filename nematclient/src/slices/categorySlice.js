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
      setcategoryEmpty(state , value){
         state.categoryData = null
      }
   }
})


export const { setCategoryDataStore , setcategoryEmpty } = categorySlice.actions;
export default categorySlice.reducer