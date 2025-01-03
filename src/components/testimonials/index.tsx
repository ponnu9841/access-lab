import React from "react";
// import TitleBadge from "@/components/custom/title-badge2";
import Heading from "@/components/custom/heading";
import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
import TestimonialCard from "./testimonial-card";

type TestimonialPropsType = {
	testimonials: Testimonial[];
};

export default function Testimonials(props: TestimonialPropsType) {
	const { testimonials } = props;
	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center mb-3">
				{/* <TitleBadge title="Our Clients" /> */}
				<Heading title="What our Clients Say About Us" />
			</div>
			<div className="mt-6">
				<CarouselSlider
					id="testimonials-slider"
					carouselContentClassName="justify-stretch max-w-[100%]"
					enableScroll
				>
					{testimonials?.map((testimonial, index) => (
						<RenderCarouselItem
							key={index}
							carouselItemClassName="md:basis-1/2 pl-4"
							cardClassName="bg-primary/5 rounded-sm p-12 relative"
							cardContentClassName={`flex flex-col items-between justify-center w-full`}
						>
							<TestimonialCard testimonial={testimonial} />
						</RenderCarouselItem>
					))}
				</CarouselSlider>
			</div>
		</div>
	);
}
