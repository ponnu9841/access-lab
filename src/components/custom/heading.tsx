import { cn } from "@/lib/utils";
import React from "react";

export default function Heading({
	title,
	className,
	variant = "h1",
}: {
	title: string;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
}) {
	return React.createElement(
		variant,
		{ className: cn("font-bold text-2xl lg:text-4xl xl:text-5xl", className) },
		title
	);
}
