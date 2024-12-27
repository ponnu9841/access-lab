import Heading from "@/components/custom/heading";
import React from "react";

export default function BannerWhy() {
	return (
		<div className="min-h-[500px] flex justify-start items-center bg-[url('/banner-why.jpg')] bg-center relative">
			<div className="absolute inset-0 bg-white bg-opacity-40 z-10"></div>
			<div className="container z-20">
				<div className="max-w-xl">
					<Heading
						title="Great Experienced Scientists & Doctors in Our Reach House"
						className="leading-relaxed"
					/>
					<p className="mt-4 text-sm">
						Lectus mauris ultrices eros in cursus turpis massa. Lectus mauris
						ultrices eros in cursus. Vel turpis nunc eget lorem dolor sed
						viverra ipsum.
					</p>
				</div>
			</div>
		</div>
	);
}
