"use client";

import NextImage from "@/components/Image";
// import Image from "next/image";
import Tilt from "react-parallax-tilt";

export default function ParallaxTiltMultiple({
	leftImage,
	rightImage,
	leftImageSize = {
		sm: 250,
		md: 400,
	},
	rightImageSize = {
		sm: 250,
		md: 400,
	},
}: {
	leftImage: string;
	rightImage: string;
	leftImageSize?: {
		sm: number;
		md: number;
	};
	rightImageSize?: {
		sm: number;
		md: number;
	};
}) {
	return (
		// <div className="relative">
		<div className="relative">
			<Tilt
				className={`relative w-[${rightImageSize.sm}px] h-[${rightImageSize.sm}px] md:w-[${rightImageSize.md}px] md:h-[${rightImageSize.md}px] float-right z-[2] mr-6`}
			>
				<NextImage
					src={rightImage}
					alt=""
					imageClassName="rounded-md"
					// className="rounded-md float-right"
					// imageClassName="object-contain float-right aspect-square"
				/>
			</Tilt>
			<div className="absolute top-20 left-0">
				<Tilt
					className={`relative w-[${leftImageSize.sm}px] h-[${leftImageSize.sm}px] md:w-[${leftImageSize.md}px] md:h-[${leftImageSize.md}px] float-right z-[1] rounded-md`}
				>
					<NextImage
						src={leftImage}
						alt=""
						imageClassName="rounded-md object-cover min-w-fit float-left"
						// className="aspect-square w-full"
						// imageClassName="object-contain float-right aspect-square"
					/>
				</Tilt>
			</div>
		</div>
		// </div>
	);
}
