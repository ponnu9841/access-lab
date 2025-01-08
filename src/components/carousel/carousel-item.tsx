// "use client";

import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const RenderCarouselItem = ({
	children,
	carouselItemClassName,
	cardClassName,
	cardContentClassName,
}: CarouselCardProps) => {
	const hasPadding = carouselItemClassName?.includes("pl-");
	let paddingValue = 0;
	if (hasPadding) {
		paddingValue = parseInt(carouselItemClassName?.split("pl-")[1] || "0") || 0;
	}

	return (
		<CarouselItem
			className={cn(
				"carousel-item relative",
				`${paddingValue ? "pl-" + paddingValue : "p-0"}`,
				carouselItemClassName
			)}
		>
			<Card
				className={cn("carousel-card border-none p-0 h-full", cardClassName)}
			>
				<CardContent
					className={cn(
						"carousel-card-content p-0 relative h-full",
						cardContentClassName
					)}
				>
					{!!children && children}
				</CardContent>
			</Card>
		</CarouselItem>
	);
};
