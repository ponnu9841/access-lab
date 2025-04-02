import React from "react";
import { motion } from "motion/react";
import Heading from "./heading";
import TitleDescription from "./title-desc";
import { animations, AnimationType } from "./heading";

export default function SectionTitle({
	title,
	description,
	headingAnimation = "fadeIn",
	descriptionAnimation = "fadeIn",
}: {
	title: string;
	description?: string;
	headingAnimation?: AnimationType;
	descriptionAnimation?: AnimationType;
}) {
	const selectedAnimation = animations[descriptionAnimation];
	return (
		<>
			<Heading
				title={title}
				className="text-center"
				animation={headingAnimation}
			/>
			{description && (
				<motion.div
					className="mx-auto text-center"
					initial={selectedAnimation.initial}
					whileInView={selectedAnimation.animate}
					transition={{ duration: 1.5, ease: "easeOut" }}
				>
					<TitleDescription desc={description} />
				</motion.div>
			)}
		</>
	);
}
