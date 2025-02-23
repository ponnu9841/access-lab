import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  data: Service[];
  error: any; //eslint-disable-line
  selectedService: Service | null;
} = {
  loading: true,
  data: [],
  error: "",
  selectedService: null,
};

export const fetchService = createAsyncThunk(
  "fetchService",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/service", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchService.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedService } = serviceSlice.actions;

export default serviceSlice.reducer;
