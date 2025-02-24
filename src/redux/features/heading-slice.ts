import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  headings: Heading[] | [];
  error: any; //eslint-disable-line
} = {
  loading: true,
  headings: [],
  error: "",
};

export const fetchHeading = createAsyncThunk(
  "fetchHeading",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/heading", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const headingSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHeading.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHeading.fulfilled, (state, action) => {
      state.loading = false;
      state.headings = action.payload;
    });
    builder.addCase(fetchHeading.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default headingSlice.reducer;
