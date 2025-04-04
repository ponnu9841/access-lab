import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import utilsReducer from "./features/utils-slice";
import userReducer from "./features/user-slice";
import bannerReducer from "./features/banner-slice";
import partnerReducer from "./features/partner-slice";
import serviceReducer from "./features/service-slice";
import testimonialReducer from "./features/testimonial-slice";
import galleryReducer from "./features/gallery-slice";
import teamsReducer from "./features/teams-slice";
import contactReducer from "./features/contact-slice";
import aboutReducer from "./features/about-slice";
import headingsReducer from "./features/heading-slice";
import pagesBannerReducer from "./features/pages-banner-slice";
import seoReducer from "./features/seo-slice";
import policyReducer from "./features/policy-slice";
import grievanceOfficerReducer from "./features/grievance-officer-slice";
import blogReducer from "./features/blog-slice";
import careerReducer from "./features/career-slice";

//Step 1
const combinedReducer = combineReducers({
	user: userReducer,
	utils: utilsReducer,
	banner: bannerReducer,
	partner: partnerReducer,
	service: serviceReducer,
	testimonial: testimonialReducer,
	gallery: galleryReducer,
	teams: teamsReducer,
	contact: contactReducer,
	about: aboutReducer,
	headings: headingsReducer,
	pagesBanner: pagesBannerReducer,
	seoTags: seoReducer,
	policies: policyReducer,
	grievanceOfficer: grievanceOfficerReducer,
	blogs: blogReducer,
	career: careerReducer,
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
