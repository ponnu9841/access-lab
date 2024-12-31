"use client";

import Tilt from "react-parallax-tilt";

export default function ParallaxTilt({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Tilt className="relative w-full h-full">
			<div className="absolute inset-0">{children}</div>
		</Tilt>
	);
}
