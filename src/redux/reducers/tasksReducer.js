import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksReducer = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, { payload }) => {
      if (state.tasks.length === 0) {
        state.tasks.push({ id: 1, status: "pending", ...payload });
      } else {
        const lastElement = state.tasks.at(-1);
        state.tasks.push({
          id: lastElement.id + 1,
          status: "pending",
          ...payload,
        });
      }
    },

    removeTask: (state, { payload }) => {
      state.tasks.filter((task) => task.id !== payload.id);
    },

    updateStatus: (state, { payload }) => {
      let targetTask = state.tasks.find((task) => task.id === payload);
      targetTask.status = "running";
    },
  },
});

export const { addTasks, removeTask } = tasksReducer.actions;

export default tasksReducer.reducer;
