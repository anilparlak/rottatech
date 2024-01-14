import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPostDetail = createAsyncThunk(
  "postDetail/getPostDetail",
  async (req = {}, { getState, requestId }) => {
    const { postDetailRequestId, postDetailLoading } = getState().postDetail;
    if (!postDetailLoading || requestId !== postDetailRequestId) {
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/posts/${req?.id}`);
      return response?.data;
    } catch (error) {
      console.log("error");
    }
  }
);

const initialState = {
  // getPostDetail
  postDetail: null,
  postDetailLoading: false,
  postDetailError: false,
  postDetailRequestId: undefined
};

const slice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    clearPostDetail: (state) => {
      state.postDetail = null;
      state.postDetailLoading = false;
      state.postDetailError = false;
      state.postDetailRequestId = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostDetail.pending, (state, action) => {
        if (!state.postDetailLoading) {
          state.postDetailLoading = true;
          state.postDetailError = false;
          state.postDetailRequestId = action?.meta?.requestId;
        }
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        const { requestId } = action?.meta;
        state.postDetailError = false;
        if (state.postDetailRequestId === requestId && !!state.postDetailLoading) {
          state.postDetailLoading = false;
          state.postDetail = action?.payload;
        }
      })
      .addCase(getPostDetail.rejected, (state) => {
        state.postDetailLoading = false;
        state.postDetailError = true;
        state.postDetail = null;
      });
  },
});

export default slice.reducer;
export const {clearPostDetail} = slice.actions;
