import Heading from "@/components/custom/heading";
import NextImage from "@/components/Image";
import { formatDateToMonthYear } from "@/utils";
import Link from "next/link";
import React from "react";

export default function BlogCard(props: BlogProps) {
	const { image, title, description, date } = props;
	console.log(date);
	return (
		<div className="aspect-video w-full group">
			<Link href="#" className="relative">
				<NextImage src={image} imageClassName="object-cover" />
				<div className="absolute -bottom-4 left-4 bg-primary w-32 group-hover:bg-black text-white px-5 py-1.5 transition ease-in duration-500 flex justify-center items-center">
					<div className="block group-hover:hidden">
						{formatDateToMonthYear(date)}
					</div>
                    <div className="hidden group-hover:block">Read More</div>

				</div>
			</Link>
			<div className="mt-6 mx-4">
				<Link href="#">
					<Heading
						title={title}
						className="text-lg xl:text-xl hover:text-secondary"
					/>
				</Link>
				<p className="mt-3 line-clamp-4">{description}</p>
			</div>
		</div>
	);
}
