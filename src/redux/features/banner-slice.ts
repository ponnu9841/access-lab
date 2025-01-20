import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
	loading: boolean;
	data: Banner[];
	error: any; //eslint-disable-line
} = {
	loading: true,
	data: [],
	error: "",
};

export const fetchBanner = createAsyncThunk(
	"fetchBanner",
	async (controller?: AbortController) => {
		const response = await axiosClient.get("/banner", {
            signal: controller?.signal,
        });
        return response.data.data;
	}
);

export const bannerSlice = createSlice({
	name: "banner",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchBanner.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchBanner.rejected, (state, action) => {
			state.loading = false;
			if (action.error.name === "TypeError") return;
			state.error = action.error.message as string;
		});
	},
});

export default bannerSlice.reducer;
