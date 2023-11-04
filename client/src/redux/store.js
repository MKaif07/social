import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/userSlice";
import postReducer from "../redux/postSlice";

const rootReducer = combineReducers({ user: userReducer, post: postReducer });

const persistedConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
