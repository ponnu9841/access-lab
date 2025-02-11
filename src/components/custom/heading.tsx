import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const animations = {
	fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
	fadeInUp: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
	},
	fadeInDown: {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
	},
	zoomIn: {
		initial: { scale: 0.8, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
	},
	slideInLeft: {
		initial: { x: -50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	},
	slideInRight: {
		initial: { x: 50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
	},
};

export type AnimationType = keyof typeof animations;

export default function Heading({
	title,
	className,
	variant = "h2",
	animation = "fadeIn",
}: {
	title: string;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	className?: string;
	animation?: AnimationType;
		
}) {
	const fontSizeClasses = {
		h1: "text-4xl xl:text-6xl",
		h2: "text-3xl xl:text-5xl",
		h3: "text-lg lg:text-2xl xl:text-3xl",
		h4: "text-lg lg:text-xl xl:text-2xl",
		h5: "text-sm lg:text-lg xl:text-xl",
		h6: "text-xs lg:text-md xl:text-lg",
		p: "text-base",
	};

	const fontSizeClass = fontSizeClasses[variant];
	const selectedAnimation = animations[animation];

	return React.createElement(
		motion[variant],
		{
			className: cn(fontSizeClass, className),
			initial: selectedAnimation.initial,
			whileInView: selectedAnimation.animate,
			transition: { duration: 1.5, ease: "easeOut" },
		},
		title
	);
}
