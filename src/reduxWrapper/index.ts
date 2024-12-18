import { setWindowSize } from "@/redux/features/utils-slice";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";

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

	const wrapper = React.createElement(React.Fragment, {}, props.children);

	return wrapper;
}
