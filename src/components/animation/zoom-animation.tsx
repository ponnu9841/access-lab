import { motion } from "motion/react";

export default function ZoomAnimation(props: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ scale: 0.5 }}
			whileInView={{ scale: 1 }}
			transition={{ duration: 1, ease: "easeOut" }}
			className={props.className || ""}
		>
			{props.children}
		</motion.div>
	);
}
