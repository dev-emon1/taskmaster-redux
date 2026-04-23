import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksReducer = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export default tasksReducer.reducer;
