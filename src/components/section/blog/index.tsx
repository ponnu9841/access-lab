import React from "react";
import BlogCard from "./blog-card";
import TitleBadge from "@/components/custom/title-badge";
import Heading from "@/components/custom/heading";

interface BlogPropsType {
	blogs: BlogProps[];
}

export default function Blog(props: BlogPropsType) {
	return (
		<>
			<div className="flex justify-center mb-4">
				<TitleBadge title="Blog" />
			</div>
            <Heading title="Latest Blog Posts" className="text-center mb-12" />
			<div className="flex flex-col md:flex-row gap-8 flex-wrap items-stretch justify-center">
				{props.blogs.map((blog, index) => (
					<div className="md:w-[calc(50%-1rem)] lg:w-[calc(32%-1rem)]" key={index}>
						<BlogCard key={index} {...blog} />
					</div>
				))}
			</div>
		</>
	);
}
