import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { animations, AnimationType } from "./heading";

export default function TitleBadge({
	title,
	className,
	animation = "fadeIn",
}: {
	title: string;
	className?: string | undefined;
	animation?: AnimationType;
}) {
	const selectedAnimation = animations[animation];
	return (
		<div className="flex gap-x-3 items-center justify-start">
			<div className="mt-auto w-[70px] h-[2.5px] bg-primary"></div>
			<motion.div
				className={cn("font-semibold text-muted-foreground text-lg", className)}
				initial={selectedAnimation.initial}
				whileInView={selectedAnimation.animate}
				transition={{ duration: 1.5, ease: "easeOut" }}
			>
				{title}
			</motion.div>
		</div>
	);
}
