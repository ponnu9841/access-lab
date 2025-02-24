import React, { useEffect } from "react";
// import TitleBadge from "@/components/custom/title-badge2";
import Heading from "@/components/custom/heading";
import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
import TestimonialCard from "./testimonial-card2";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { fetchTestimonial } from "@/redux/features/testimonial-slice";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { getCurrentSectionHeading } from "@/utils";

type TestimonialPropsType = {
	testimonials: Testimonial[];
	heading: Heading[]
};

export default function Testimonials(props: TestimonialPropsType) {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector(
		(state) => state.rootReducer.testimonial
	);
	const testimonials = data.length > 0 ? data : props.testimonials;
	const testimonialHeading = getCurrentSectionHeading(props.heading, "testimonials");

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchTestimonial(controller));
		// dispatch partner
		return () => controller.abort();
	}, []); //eslint-disable-line
	
	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center mb-3">
				{/* <TitleBadge title="Our Clients" /> */}
				<Heading title={testimonialHeading?.title || "What our Clients Say About Us"} animation="fadeInDown" />
			</div>
			<div className="mt-6">
				<CarouselSlider
					id="testimonials-slider"
					carouselContentClassName="justify-stretch max-w-[100%]"
					togglerPosition="bottom"
				>
					{testimonials?.map((testimonial, index) => (
						<RenderCarouselItem
							key={index}
							carouselItemClassName="pl-4"
							cardClassName="bg-tranparent rounded-sm p-12 relative"
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
