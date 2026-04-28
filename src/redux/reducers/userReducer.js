import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../utils/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    return {
      name: data.user.displayName,
      email: data.user.email,
    };
  },
);

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      ((state.name = payload.name), (state.email = payload.email));
    },
    loadingToggle: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      ((state.name = ""), (state.email = ""));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        ((state.isLoading = true),
          (state.isError = false),
          (state.name = ""),
          (state.email = ""),
          (state.error = ""));
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        ((state.isLoading = false),
          (state.isError = false),
          (state.name = payload.name),
          (state.email = payload.email),
          (state.error = payload.error));
      })
      .addCase(createUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isError = true),
          (state.name = ""),
          (state.email = ""),
          (state.error = action.error.message));
      });
  },
});

export const { setUser, loadingToggle, logout } = userReducer.actions;

export default userReducer.reducer;
