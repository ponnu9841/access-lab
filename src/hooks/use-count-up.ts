// "use client";
import { useState, useEffect } from "react";

export function useCountUp(end: number, duration: number = 2000) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (count < end) {
			const stepTime = Math.abs(Math.floor(duration / end));
			const timer = setTimeout(() => {
				setCount((prevCount) => prevCount + 1);
			}, stepTime);

			return () => clearTimeout(timer);
		}
	}, [count, end, duration]);

	return count;
}
