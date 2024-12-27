import React from "react";
import BlogCard from "./blog-card";
import TitleBadge from "@/components/custom/title-badge";
import Heading from "@/components/custom/heading";

interface BlogPropsType {
	blogs: BlogProps[];
}

export default function Blog(props: BlogPropsType) {
	return (
		<div className="container">
			<div className="flex justify-center mb-4">
				<TitleBadge title="Blog" />
			</div>
            <Heading title="Latest Blog Posts" className="text-center mb-12" />
			<div className="flex gap-8 flex-wrap">
				{props.blogs.map((blog, index) => (
					<div className="flex-1" key={index}>
						<BlogCard key={index} {...blog} />
					</div>
				))}
			</div>
		</div>
	);
}
