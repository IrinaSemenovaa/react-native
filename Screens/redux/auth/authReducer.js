import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser, logoutUser, registerUser } from "./authOperations";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null, photo: null, id: null },
    accessToken: null,
    isLoading: false,
    error: false,
    isLoggedIn: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login success. Payload:", action.payload);
        state.user.name = action.payload.displayName;
        state.user.email = action.payload.email;
        state.user.photo = action.payload.photoURL;
        state.user.id = action.payload.uid;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Registration success. Payload:", action.payload);
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = { name: null, email: null, photo: null, id: null };
        state.accessToken = null;
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
