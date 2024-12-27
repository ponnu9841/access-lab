import React from "react";
import CarouselSlider from "@/components/carousel";

type HomeSliderProps = {
	sliderData: {
		image: string;
		title: string;
		description: string;
	}[];
};

export default function HomeSlider(props: HomeSliderProps) {
	const { sliderData } = props;
	const heroImages = sliderData.map((item) => ({ image: item.image }));
	return (
		<CarouselSlider
			images={heroImages}
			cardContentClassName="min-h-[70vh] lg:min-h-[80vh] xl:min-h-[100vh_-_100px]"
			id="home-slider"
		>
			<div className="absolute left-10"></div>
		</CarouselSlider>
	);
}
