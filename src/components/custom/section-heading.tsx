import React from "react";
import Heading from "./heading";
import TitleDescription from "./title-desc";

export default function SectionHeading({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<>
			<Heading title={title} variant="h3" className="font-bold my-6" />
			{description && (
				<TitleDescription
					desc={description}
					className="font-normal text-base mb-6"
				/>
			)}
		</>
	);
}
