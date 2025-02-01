import Heading from "@/components/custom/heading";
// import TitleDescription from "@/components/custom/title-desc";
// import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ServiceCard(props: Service) {
	const {  title } = props;
	return (
		<div className="bg-background rounded-md p-10 border relative hover:border-none hover:shadow-2xl hover:scale-[1.01] hover:-mt-1 transition-all duration-500">
			{/* <NextImage
				src={icon}
				className="aspect-square max-h-[50px] max-w-[50px] mx-auto"
			/> */}
			<Heading
				title={title}
				variant="h4"
				className="font-bold mt-3 mb-4 lg:mt-8 mt-3 mb-4 lg:mb-6 text-center"
			/>
			{/* <TitleDescription
				desc={description}
				className="text-base font-normal mb-6 text-center"
			/> */}
			<div className="text-center">
				<Button variant="ghost" className="text-base text-primary">
					Learn More
				</Button>
			</div>
		</div>
	);
}
