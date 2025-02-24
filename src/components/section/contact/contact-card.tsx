import AnimateText from "@/components/animation/animate-text";
import NextImage from "@/components/Image";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

export interface ContactCardProps {
	icon: string;
	title: string;
	line1: string;
	line2: string;
}

export default function ContactCard(props: ContactCardProps) {
	const { icon, title, line1, line2 } = props;
	return (
		<Card className="shadow-2xl p-2 pt-10 pb-6 border-none h-full">
			<CardContent>
				<div className="flex space-x-5 md:space-x-10">
					<div>
						<NextImage
							src={icon}
							className="aspect-square min-w-[50px] max-h-[50px]"
						/>
					</div>
					<div>
						<CardTitle>
							<AnimateText text={title} />
						</CardTitle>
						<CardDescription className="text-base mt-3">
							<div>
								<AnimateText text={line1} />
							</div>
							<div>
								<AnimateText text={line2} />
							</div>
						</CardDescription>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
