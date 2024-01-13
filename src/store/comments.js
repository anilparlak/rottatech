import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (req = {}, { getState, requestId }) => {
    const { commentsRequestId, commentsLoading } = getState().comments;
    if (!commentsLoading || requestId !== commentsRequestId) {
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/posts/${req?.id}/comments`);
      return response?.data;
    } catch (error) {
      console.log("error");
    }
  }
);

const initialState = {
  // getComments
  comments: null,
  commentsLoading: false,
  commentsError: false,
  commentsRequestId: undefined
};

const slice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => (
        comment?.id !== action?.payload
      ))
    } 
   },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state, action) => {
        if (!state.commentsLoading) {
          state.commentsLoading = true;
          state.commentsError = false;
          state.commentsRequestId = action?.meta?.requestId;
        }
      })
      .addCase(getComments.fulfilled, (state, action) => {
        const { requestId } = action?.meta;
        state.commentsError = false;
        if (state.commentsRequestId === requestId && !!state.commentsLoading) {
          state.commentsLoading = false;
          state.comments = action?.payload;
        }
      })
      .addCase(getComments.rejected, (state) => {
        state.commentsLoading = false;
        state.commentsError = true;
        state.comments = null;
      });
  },
});

export default slice.reducer;
export const {deleteComment} = slice.actions;
