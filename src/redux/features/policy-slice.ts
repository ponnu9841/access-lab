import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  policies: Policy[];
  error: any; //eslint-disable-line
  selectedPolicy: Policy | null;
} = {
  loading: true,
  policies: [],
  error: "",
  selectedPolicy: null,
};

export const fetchPolicy = createAsyncThunk(
  "fetchPolicy",
  async (controller?: AbortController) => {
    const response = await axiosClient.get("/policies", {
      signal: controller?.signal,
    });
    return response.data.data;
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setSelectedPolicy: (state, action) => {
      state.selectedPolicy = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPolicy.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.policies = action.payload;
    });
    builder.addCase(fetchPolicy.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedPolicy } = partnerSlice.actions;

export default partnerSlice.reducer;
