import NextImage from "@/components/Image";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { formatDateToMonthYear } from "@/utils";
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlogCard(props: BlogProps) {
	const { image, title, description, views, date } = props;
	return (
		<Card className="group border-none">
			<Link href="#" className="relative">
				<NextImage
					src={image}
					className="aspect-video min-w-full"
					imageClassName="object-cover"
				/>
				{/* <div className="absolute -bottom-4 left-4 bg-primary w-32 group-hover:bg-black text-white px-4 py-1.5 transition ease-in duration-500 flex justify-center items-center">
					<div className="block group-hover:hidden">
						{formatDateToMonthYear(date)}
					</div>
					<div className="hidden group-hover:block">Read More</div>
				</div> */}
			</Link>
			<CardContent className="mt-6 px-0">
				<div className="flex gap-x-2 items-center text-muted-foreground text-sm mb-4">
					<Calendar size={16} /> <span>{formatDateToMonthYear(date)}</span>
					<Eye className="ml-4" size={18} /> <span>{views} views</span>
				</div>
				<Link href="#">
					<CardTitle className="text-lg xl:text-xl hover:text-secondary">
						{title}
					</CardTitle>
				</Link>
				<CardDescription className="mt-3 line-clamp-4">
					{description}
				</CardDescription>
				<div className="mt-4">
					<Link href="#" className="link">
						<mark>Read More</mark>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
