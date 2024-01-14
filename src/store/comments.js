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

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (req, { getState, requestId }) => {
    const { addCommentRequestId, addCommentLoading } = getState().comments;
    if (!addCommentLoading || requestId !== addCommentRequestId) {
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/comments`, {
        ...req
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      );
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
  commentsRequestId: undefined,

  // addComment
  addComment: null,
  addCommentLoading: false,
  addCommentError: false,
  addCommentRequestId: undefined
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
      })

      .addCase(createComment.pending, (state, action) => {
        if (!state.addCommentLoading) {
          state.addCommentLoading = true;
          state.addCommentError = false;
          state.addCommentRequestId = action?.meta?.requestId;
        }
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { requestId } = action?.meta;
        state.addCommentError = false;
        if (state.addCommentRequestId === requestId && !!state.addCommentLoading) {
          state.addCommentLoading = false;
          state.comments.unshift(action?.payload);
        }
      })
      .addCase(createComment.rejected, (state) => {
        state.addCommentLoading = false;
        state.addCommentError = true;
        state.addComment = null;
      })
  },
});

export default slice.reducer;
export const {deleteComment} = slice.actions;
