import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function TitleBadge({
	title,
	className,
}: {
	title: string | ReactNode;
	className?: string | undefined;
}) {
	return (
		<div
			className={cn(
				"rounded-[3px] text-sm font-semibold uppercase py-1.5 px-3 text-primary bg-primary/10 flex max-w-fit tracking-wide flex justify-center items-center leading-3",
				className
			)}
		>
			{title}
		</div>
	);
}
