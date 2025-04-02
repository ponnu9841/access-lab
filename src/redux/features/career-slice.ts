import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  careerData: Career | null;
  error: any; //eslint-disable-line
} = {
  loading: true,
  careerData: null,
  error: "",
};

export const fetchCareer = createAsyncThunk(
  "fetchAbout",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/career", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const careerSlice = createSlice({
  name: "fetchCareer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCareer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCareer.fulfilled, (state, action) => {
      state.loading = false;
      state.careerData = action.payload;
    });
    builder.addCase(fetchCareer.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default careerSlice.reducer;
