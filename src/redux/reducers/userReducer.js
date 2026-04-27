import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Emon Hossain",
  email: "emon@gmail.com",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userReducer.reducer;
