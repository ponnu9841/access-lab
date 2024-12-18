"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const hero = [
	{
		image: "/hero-1.jpg",
	},
	{
		image: "/hero-2.jpg",
	},
	{
		image: "/hero-3.jpg",
	},
];

export default function HomeSlider() {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);
	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full relative"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent className="ml-0">
				{hero.map((item, index) => (
					<CarouselItem key={index} className="p-0 min-w-full">
						<Card className="border-none p-0">
							<CardContent className="min-w-full min-h-[70vh] lg:min-h-[80vh] xl:min-h-[100vh] p-0 relative">
								<Image
									src={item.image}
									fill
									alt="banner"
                                    className="object-cover"
								/>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-8 z-3" />
			<CarouselNext className="absolute right-8 z-3" />
		</Carousel>
	);
}
