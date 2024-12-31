import { cn } from "@/lib/utils";
import React from "react";

export default function TitleBadge({
	title,
	className,
}: {
	title: string;
	className?: string | undefined;
}) {
	return (
		<div className="flex gap-x-3 items-center justify-start">
			<div className="mt-auto w-[70px] h-[2.5px] bg-primary"></div>
			<div className={cn("font-semibold text-muted-foreground text-lg", className)}>{title}</div>
		</div>
	);
}
