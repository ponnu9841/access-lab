import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  aboutData: About | null;
  error: any; //eslint-disable-line
} = {
  loading: true,
  aboutData: null,
  error: "",
};

export const fetchAbout = createAsyncThunk(
  "fetchAbout",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/about", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const aboutSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAbout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.aboutData = action.payload;
    });
    builder.addCase(fetchAbout.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default aboutSlice.reducer;
