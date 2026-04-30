import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../features/tasks/taskSlice";
import userSlice from "../features/user/userSlice";
import baseApi from "../services/baseApi";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tasks: taskSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
