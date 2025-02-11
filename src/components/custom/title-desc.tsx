import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TitleDescription = ({
	desc,
	className,
}: {
	desc: string;
	className?: string;
}) => (
	<motion.p
		className={cn(
			"text-muted-foreground font-semibold text-lg mt-3",
			className
		)}
		initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
		whileInView={{ opacity: 1, filter: "blur(0)", y: 0 }}
		transition={{ duration: 1, ease: "easeOut" }}
	>
		{desc}
	</motion.p>
);

export default TitleDescription;
