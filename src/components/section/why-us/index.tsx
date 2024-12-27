import React from "react";
import NextImage from "../../Image";
import TitleBadge from "@/components/custom/title-badge";
import { Button } from "@/components/ui/button";
import Heading from "@/components/custom/heading";
import { Check } from "lucide-react";

const features = [
	"100% Safe & hygienic sample collection",
	" Sample collection from home/office at your convenience",
	"Timely service and delivery of test reports guaranteed!",
	"Reports from the best labs, diagnostic centres in town.",
	"For queries on the tests, labs and bookings, give us a ring: +91 92880 08801",
	"Single collection charge per location",
];

export default function WhyUs() {
	return (
		<div className="container">
			<div className="flex flex-col lg:flex-row gap-16 items-stretch">
				<div className="aspect-square flex-1">
					<NextImage src="/about.jpeg" imageClassName="object-cover" />
				</div>
				<div className="lg:my-2 flex-1">
					<TitleBadge title="What About Us" />
					<Heading
						title="The Heart and Science of Medicate test"
						className="mt-4"
					/>
					<p className="text-gray-600 mt-2 leading-7 mt-3">
						<span className="text-primary">ACCESS</span> revolutionizes the way
						you approach medical testing. We understand that your time is
						valuable and your health is paramount. That’s why we’ve created a
						service that brings the lab to you.
						<br />
						Our mission is to make high-quality lab testing accessible,
						convenient, and stress-free for everyone in Calicut, Ernakulam,
						Palakkad, and Thrissur. With ACCESS, you can say goodbye to long
						waits at diagnostic centers and hello to professional testing in the
						comfort of your own home.
					</p>
					<ul className="mt-2 leading-10">
						{features.map((feature, index) => (
							<li className="flex space-x-2 items-center" key={index}>
								<Check className="text-secondary" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
					<Button className="mt-4 flex items-center" size="lg">
						Read More <span className="text-2xl">+</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
