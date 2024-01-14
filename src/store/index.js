import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import posts from "./posts";
import postDetail from "./postDetail";
import comments from "./comments";

const reducer = combineReducers({
  posts,
  postDetail,
  comments,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: window.state || {},
});

const persistor = persistStore(store);

persistor.pause();

export { persistor, store };