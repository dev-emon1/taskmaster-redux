import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

/* ================= INITIAL STATE ================= */
const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isError: false,
  error: "",
};

/* ================= CREATE USER ================= */
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      return {
        name: name,
        email: data.user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= LOGIN USER ================= */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);

      return {
        name: data.user.displayName || "User",
        email: data.user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= LOGOUT USER ================= */
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= SLICE ================= */
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE USER ===== */
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.email = payload.email;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      /* ===== LOGIN USER ===== */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.name;
        state.email = payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })

      /* ===== LOGOUT USER ===== */
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.name = "";
        state.email = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      });
  },
});

/* ================= EXPORTS ================= */
export const { setUser } = userReducer.actions;

export default userReducer.reducer;
