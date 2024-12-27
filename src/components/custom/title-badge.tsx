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
				"rounded-[3px] text-sm uppercase py-1 px-4 text-primary bg-primary/10 flex max-w-fit tracking-wide",
				className
			)}
		>
			{title}
		</div>
	);
}
