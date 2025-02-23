import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  data: Testimonial[];
  error: any; //eslint-disable-line
  selectedTestimonial: Testimonial | null;
  testimonialType: string;
} = {
  loading: true,
  data: [],
  error: "",
  selectedTestimonial: null,
  testimonialType: "",
};

export const fetchTestimonial = createAsyncThunk(
  "fetchTestimonial",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/testimonial", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    setSelectedTestimonial: (state, action) => {
      state.selectedTestimonial = action.payload;
    },
    clearSelectedTestimonial: (state) => {
      state.selectedTestimonial = null;
    },
    setTestimonialType: (state, action) => {
      state.testimonialType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTestimonial.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTestimonial.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const {
  setSelectedTestimonial,
  clearSelectedTestimonial,
  setTestimonialType,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
