import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  selectedPost: null,
  error: null,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    ready: (state) => {
      state.error = null;
      state.loading = false;
    },
    postFetchStart: (state) => {
      state.loading = true;
    },
    postFetchSuccess: (state, action) => {
      state.posts = action.payload;
      state.selectedPost = null;
      state.loading = false;
      state.error = false;
    },
    postFetchFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
    setNewPostStart: (state) => {
      state.loading = true;
    },
    setNewPostSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setNewPostFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  ready,
  postFetchStart,
  postFetchSuccess,
  postFetchFail,
  setPost,
  setNewPostStart,
  setNewPostSuccess,
  setNewPostFail,
} = postSlice.actions;
export default postSlice.reducer;
