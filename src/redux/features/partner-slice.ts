import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
	loading: boolean;
	data: Partner[];
	error: any; //eslint-disable-line
} = {
	loading: true,
	data: [],
	error: "",
};

export const fetchPartner = createAsyncThunk(
	"fetchPartner",
	async (controller?: AbortController) => {
		const response = await axiosClient.get("/partner", {
            signal: controller?.signal,
        });
        return response.data.data;
	}
);

export const partnerSlice = createSlice({
	name: "partner",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchPartner.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchPartner.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchPartner.rejected, (state, action) => {
			state.loading = false;
			if (action.error.name === "TypeError") return;
			state.error = action.error.message as string;
		});
	},
});

export default partnerSlice.reducer;
