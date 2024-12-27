"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { RenderCarouselItem } from "./carousel-item";
import { cn } from "@/lib/utils";

const CarouselSlider = (props: CarouselSliderProps) => {
	const {
		images,
		carouselContentClassName,
		carouselItemClassName,
		cardContentClassName,
		cardClassName,
		children,
		orientation = "horizontal",
		id,
	} = props;
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	const opts = {
		loop: true,
	};

	const hasPadding = carouselItemClassName?.includes("pl-");
	let paddingValue = 0;
	if (hasPadding) {
		paddingValue = parseInt(carouselItemClassName?.split("pl-")[1] || "0") || 0;
	}

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full relative carousel"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			id={id || "carousel-slider"}
			orientation={orientation}
			opts={opts}
		>
			<CarouselContent
				className={cn(
					"carousel-content",
					`${paddingValue ? "-ml-" + paddingValue : "m-0"}`,
					carouselContentClassName
				)}
			>
				{images?.map((image, index) => (
					<RenderCarouselItem
						key={index}
						cardContentClassName={cardContentClassName}
						carouselItemClassName={carouselItemClassName}
						cardClassName={cardClassName}
					>
						<Image
							src={image.image}
							fill
							alt="banner"
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 60vw"
							priority={index === 0}
						/>
						{!!children && children}
					</RenderCarouselItem>
				))}
				{!!!images && <>{!!children && children}</>}
			</CarouselContent>
			<CarouselPrevious className="absolute left-8 z-3" />
			<CarouselNext className="absolute right-8 z-3" />
		</Carousel>
	);
};

export default CarouselSlider;
