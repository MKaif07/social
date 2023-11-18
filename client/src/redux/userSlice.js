import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  friendData: null,
  error: null,
  loading: false,
  theme: "dark",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ready: (state) => {
      state.error = null;
      state.loading = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    udpateUserStart: (state) => {
      state.loading = false;
    },
    udpateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    udpateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFriends: (state, action) => {
      if (state.currentUser) {
        state.currentUser.friends = action.payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setFriendFriends: (state, action) => {
      if (state.friendData) {
        state.friendData.friends = action.payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFriendStart: (state) => {
      state.loading = true;
    },
    setFriendSuccess: (state, action) => {
      state.friendData = action.payload;
      state.loading = false;
    },
    setFriendFail: (state) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  ready,
  setTheme,
  signInStart,
  signInSuccess,
  signInFail,
  udpateUserStart,
  udpateUserSuccess,
  udpateUserFail,
  setFriends,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  setFriendStart,
  setFriendSuccess,
  setFriendFail,
  setFriendFriends,
} = userSlice.actions;
export default userSlice.reducer;
