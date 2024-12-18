import { configureStore } from "@reduxjs/toolkit";
import utilsReducer from "./features/utils-slice";

const store = configureStore({
	reducer: {
		utilsReducer,
	},
	// No need to specify middleware explicitly, as RTK includes thunk by default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
