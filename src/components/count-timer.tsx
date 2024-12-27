"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface CustomerCountTimerProps {
	totalCount: number;
	className?: string;
}

export function CustomerCountTimer(props: CustomerCountTimerProps) {
	const { totalCount = 20, className } = props;
	const count = useCountUp(totalCount);

	return (
		<div
			className={cn(
				"min-w-[130px] text-foreground text-6xl font-semibold text-primary leading-none relative flex justify-center items-center gap-x-0.5",
				className
			)}
		>
			<div className="absolute -top-6 -left-6 text-white/5">
				{count}
			</div>
			{count}
			<Plus className="text-white font-semibold" size={20} />
		</div>
	);
}

const RenderCount = ({
	totalCount = 20,
	title = "",
	className = "",
}: {
	totalCount: number;
	title: string;
	className?: string;
}) => (
	<div className="flex justify-center items-center flex-col">
		<div className="flex space-x-1 items-center">
			<CustomerCountTimer totalCount={totalCount} className={cn("text-white", className)} />
		</div>
		<span className="text-xs font-semibold uppercase text-white">{title}</span>
	</div>
);

export default RenderCount;
