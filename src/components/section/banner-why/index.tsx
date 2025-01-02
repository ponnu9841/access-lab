import Heading from "@/components/custom/heading";
import React from "react";

export default function BannerWhy() {
	return (
		<div className="min-h-[500px] flex justify-start items-center bg-[url('/newsletter.jpg')] bg-cover bg-center relative">
			<div className="absolute inset-0 bg-primary/60 z-10"></div>
			<div className="container z-20 text-white">
				<div className="max-w-2xl">
					<Heading
						title="Great Experienced Scientists & Doctors in Our Reach House"
						className="leading-relaxed"
					/>
					<p className="mt-4 text-base">
						Lectus mauris ultrices eros in cursus turpis massa. Lectus mauris
						ultrices eros in cursus. Vel turpis nunc eget lorem dolor sed
						viverra ipsum.
					</p>
				</div>
			</div>
		</div>
	);
}
