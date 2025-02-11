import React from "react";
import { motion } from "motion/react";
import Heading, { animations, AnimationType } from "./heading";
import TitleDescription from "./title-desc";

export default function SectionHeading({
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
				variant="h3"
				className="font-bold my-6"
				animation={headingAnimation}
			/>
			{description && (
				<motion.div
					className="mx-auto text-left max-w-lg"
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
