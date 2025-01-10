import { setWindowSize } from "@/redux/features/utils-slice";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { montserrat, nunito } from "@/utils/fonts";


export default function ReduxWrapper(props: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const windowSize = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		dispatch(setWindowSize(windowSize));
		
		const controller = new AbortController();

		return () => {
			controller.abort();
		}
	}, []); //eslint-disable-line

	const wrapper = React.createElement("div", {
		className: `min-h-screen w-full ${montserrat.variable} ${nunito.className}`
	}, props.children);

	return wrapper;
}
