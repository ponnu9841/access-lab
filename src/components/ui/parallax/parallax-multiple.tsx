"use client";

import NextImage from "@/components/Image";
// import Image from "next/image";
import Tilt from "react-parallax-tilt";

export default function ParallaxTiltMultiple({
	leftImage,
	rightImage,
}: {
	leftImage: string;
	rightImage: string;
}) {
	return (
		// <div className="relative">
		<div className="relative">
			<Tilt className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] float-right z-[2]">
				<NextImage
					src={rightImage}
					alt=""
					imageClassName="rounded-md"
					// className="rounded-md float-right"
					// imageClassName="object-contain float-right aspect-square"
				/>
			</Tilt>
			<div className="absolute top-20 left-0">
				<Tilt className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] float-right z-[1]">
					<NextImage
						src={leftImage}
						alt=""
						imageClassName="rounded-md object-cover"
						// className="rounded-md float-right"
						// imageClassName="object-contain float-right aspect-square"
					/>
				</Tilt>
			</div>
		</div>
		// </div>
	);
}
