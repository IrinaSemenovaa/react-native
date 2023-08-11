import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    commentsCount: {},
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCommentsCount: (state, action) => {
      state.commentsCount = action.payload;
    },
  },
});

export const { setPosts, setCommentsCount } = postSlice.actions;

export default postSlice.reducer;
