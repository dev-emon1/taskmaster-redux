import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasksReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});

export default store;
