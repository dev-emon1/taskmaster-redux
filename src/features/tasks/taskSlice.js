import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  userSpecificTasks: [],
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
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    },

    updateStatus: (state, { payload }) => {
      const targetTask = state.tasks.find((task) => task.id === payload.id);
      targetTask.status = payload.status;
    },
    userTasks: (state, { payload }) => {
      state.userSpecificTasks = state.tasks.filter(
        (task) => task.assignedTo === payload,
      );
    },
  },
});

export const { addTasks, removeTask, updateStatus, userTasks } =
  tasksReducer.actions;

export default tasksReducer.reducer;
