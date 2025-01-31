import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
	loading: boolean;
	data: Teams[];
	error: any; //eslint-disable-line
	selectedData: Teams | null;
} = {
	loading: false,
	data: [],
	error: "",
	selectedData: null,
};

export const fetchTeams = createAsyncThunk(
	"fetchTeams",
	async (controller?: AbortController) => {
		const response = await axiosClient.get("/teams", {
			signal: controller?.signal,
		});
		return response.data.data;
	}
);

export const teamsSlice = createSlice({
	name: "teams",
	initialState,
	reducers: {
		setSelectedTeam: (state, action) => {
			state.selectedData = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchTeams.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchTeams.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchTeams.rejected, (state, action) => {
			state.loading = false;
			if (action.error.name === "TypeError") return;
			state.error = action.error.message as string;
		});
	},
});

export const { setSelectedTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
