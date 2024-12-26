import { ReactNode } from "react";

export default function TitleBadge({
	title,
}: {
	title: string | ReactNode;
}) {
	return (
		<div className="rounded-[3px] text-sm uppercase py-1 px-4 text-primary bg-primary/10 flex max-w-fit tracking-wide">
			{title}
		</div>
	);
}
