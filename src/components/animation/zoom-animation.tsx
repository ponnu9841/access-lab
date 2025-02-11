import { motion } from "motion/react";

export default function ZoomAnimation(props: ReactChildren) {
	return (
		<motion.div
			initial={{ scale: 0.5 }}
			whileInView={{ scale: 1 }}
			transition={{ duration: 1, ease: "easeOut" }}
		>
			{props.children}
		</motion.div>
	);
}
