import React from "react";
import CarouselSlider from "@/components/carousel";

type HomeSliderProps = {
	sliderData: Banner[];
};

export default function HomeSlider(props: HomeSliderProps) {
	const { sliderData } = props;
	return (
		<CarouselSlider
			images={sliderData}
			cardContentClassName="min-h-[70vh] lg:min-h-[80vh] xl:min-h-screen"
			id="home-slider"
			showTitle
		>
		</CarouselSlider>
	);
}
