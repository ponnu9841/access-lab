import React from "react";

export default function SectionLayout({
	sectionLeft,
	sectionRight,
}: {
	sectionLeft: React.ReactNode;
	sectionRight: React.ReactNode;
}) {
	return (
		<div className="lg:flex gap-16 flex-wrap items-stretch">
			<div className="lg:w-[calc(60%-2rem)] min-h-[400px] md:min-h-[550px]">
				{sectionLeft}
			</div>
			<div className="flex-1 lg:mb-24">{sectionRight}</div>
		</div>
	);
}
