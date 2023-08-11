import { auth } from "../../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password, nickname, avatar }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;
      console.log("User created in registerUser:", user);

      await updateProfile(user, { displayName: nickname, photoURL: avatar });

      const userInfo = {
        id: user.uid,
        email: user.email,
        photo: avatar,
        name: nickname,
      };

      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "credentials/login",
  async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return credentials.user;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
});

export const uploadAvatarToStorage = async (blob) => {
  try {
    const storageRef = ref(storage, "avatars/" + new Date().getTime() + ".jpg");

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    console.log("downloadURL in uploadAvatarToStorage", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

