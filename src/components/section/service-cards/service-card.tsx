"use client";
// import NextImage from "@/components/Image";
import Heading from "@/components/custom/heading";
// import Doctor from "@/icons/doctor";
import { ServiceCardProps } from "@/interfaces/common";
import React from "react";

export default function ServiceCard(props: ServiceCardProps) {
	const {
		icon,
		hoverIcon,
		title,
		description,
		children,
		variant = "primary",
	} = props;
	return (
		<div
			className={`group w-full rounded-sm max-w-lg p-12 text-white ${
				variant === "primary" ? "bg-primary" : "bg-secondary"
			}`}
		>
			<div className="flex justify-between">
				{React.isValidElement(icon) && (
					<div className="fill-[rgba(255,255,255)]">{icon}</div>
				)}
				<div className="relative -top-4 -right-8 group-hover:-right-4 animate-ease-in-out duration-500">
					{React.isValidElement(hoverIcon) && (
						<div className="fill-[rgba(255,255,255,0.25)]">{hoverIcon}</div>
					)}
				</div>
			</div>
			{title && <Heading className="mt-4 text-lg xl:text-3xl" title={title} />}
			{description && (
				<p className="mb-4 text-base leading-7 mt-2">{description}</p>
			)}
			{children && children}
		</div>
	);
}
