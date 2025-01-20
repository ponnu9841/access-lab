import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import utilsReducer from "./features/utils-slice";
import userReducer from "./features/user-slice";
import bannerReducer from "./features/banner-slice";

//Step 1
const combinedReducer = combineReducers({
	user: userReducer,
	utils: utilsReducer,
	banner: bannerReducer
});

//eslint-disable-next-line
const rootReducer = (state: any, action: Action) => {
	if (action.type === "RESET") {
		//We are calling this RESET, but call what you like!
		state = {};
	}
	return combinedReducer(state, action);
};

const store = configureStore({
	reducer: {
		rootReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
