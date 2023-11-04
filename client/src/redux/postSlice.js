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
      // console.log("called state setPost");
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  ready,
  postFetchStart,
  postFetchSuccess,
  postFetchFail,
  setPost,
} = postSlice.actions;
export default postSlice.reducer;
