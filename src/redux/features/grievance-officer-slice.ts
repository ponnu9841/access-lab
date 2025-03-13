import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  grievanceOfficer: GrievanceOfficer | null;
  error: any; //eslint-disable-line
} = {
  loading: true,
  grievanceOfficer: null,
  error: "",
};

export const fetchGrievanceOfficer = createAsyncThunk(
  "fetchgrievanceOfficer",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/grievance-officer", {
      signal: controller?.signal,
    });
    console.log(response.data.data)
    return response.data.data;
  }
);

export const grievanceOfficerSlice = createSlice({
  name: "grievanceOfficer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchGrievanceOfficer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGrievanceOfficer.fulfilled, (state, action) => {
      state.loading = false;
      state.grievanceOfficer = action.payload;
    });
    builder.addCase(fetchGrievanceOfficer.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export default grievanceOfficerSlice.reducer;
