import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type NextImageProps = {
	src: string;
	alt?: string;
	priority?: boolean;
	className?: string;
	imageClassName?: string;
};

export default function NextImage(props: NextImageProps) {
	const { src, alt = "", className, priority = true, imageClassName } = props;
	return (
		<div className={cn("relative w-full h-full", className)}>
			<Image
				src={src}
				fill={true}
				className={cn("object-contain w-full relative", imageClassName)}
				alt={alt}
				sizes="(max-width: 768px) 100vw, 60vw"
				priority={priority}
			/>
		</div>
	);
}
