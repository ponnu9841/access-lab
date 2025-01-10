import { configureStore } from "@reduxjs/toolkit";
import utilsReducer from "./features/utils-slice";
import userReducer from "./features/user-slice";

const store = configureStore({
	reducer: {
		utilsReducer,
		userReducer
	},
	// No need to specify middleware explicitly, as RTK includes thunk by default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
