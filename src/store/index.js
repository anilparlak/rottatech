import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import posts from "./posts";
import postDetail from "./postDetail";
import comments from "./comments";

const reducer = combineReducers({
    posts,
    postDetail,
    comments
});


export const store = configureStore({
    reducer
})