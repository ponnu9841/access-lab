import { cn } from "@/lib/utils";
import React from "react";

export default function Heading({
	title,
	className,
	variant = "h2",
}: {
	title: string;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
}) {
const fontSizeClasses = {
  h1: "text-4xl xl:text-6xl",
  h2: "text-3xl xl:text-5xl",
  h3: "text-lg lg:text-2xl xl:text-3xl",
  h4: "text-lg lg:text-xl xl:text-2xl",
  h5: "text-sm lg:text-lg xl:text-xl",
  h6: "text-xs lg:text-md xl:text-lg",
};

const fontSizeClass = fontSizeClasses[variant];

	return React.createElement(
		variant,
		{ className: cn(fontSizeClass, className) },
		title
	);
}
