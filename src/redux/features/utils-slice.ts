import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	windowSize: {
		width: 0,
		height: 0,
	},
	selectedAddressId: 0,
};

export const utilsSlice = createSlice({
	name: "utils",
	initialState,
	reducers: {
		setWindowSize: (state, action) => {
			return {
				...state,
				windowSize: action.payload,
			};
		},
	},
});

export const { setWindowSize } = utilsSlice.actions;

export default utilsSlice.reducer;
