import RenderCount from "@/components/count-timer";
import RenderAvatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/heading";
import TitleBadge from "@/components/custom/title-badge";
import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import StethoscopeIcon from "@/icons/stethoscope";
import { aboutCounter } from "@/services/dummyData";
import { Plus } from "lucide-react";

export default function About() {
	return (
		<div className="container lg:flex items-stretch justify-between w-full">
			<div className="flex-1 mb-8 md:mb-10 lg:mb-0 lg:mt-4">
				<TitleBadge title="About Us" />
				<Heading
					title="Joining Hands With Techno Easement"
					variant="h2"
					className="mt-3 mb-2"
				/>
				<p className="text-muted-foreground mb-4 text-lg">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry`s standard dummy text
				</p>
				<div className="flex space-x-6 items-center">
					<RenderAvatar
						icon={<StethoscopeIcon size={40} fill="#fff" />}
						// image={"/icons/stethoscope.svg"}
						avatarIconClassName="p-6 bg-primary "
					/>

					<div>
						<Heading
							title="Infection Prevention"
							variant="h3"
							className="font-semibold text-lg xl:text-2xl"
						/>
						<div className="text-muted-foreground text-lg">
							There are many variations of passages of LoremIpsum available
							majority.
						</div>
					</div>
				</div>
				<div className="mt-12">
					<Button size="lg" className="flex items-center">
						<div>Read More</div>
						<Plus />
					</Button>
				</div>
			</div>
			<div className="aspect-square md:min-w-[600px] max-w-full">
				<NextImage
					src="/about-1.jpeg"
					alt="doctor image"
					imageClassName="object-cover"
				/>
			</div>
			<div className="mt-6 md:my-auto mr-auto px-10 lg:pr-0 lg:pl-10 z-10 py-16 lg:py-0 bg-primary">
				<div className="flex flex-col md:flex-row lg:flex-col justify-between gap-y-16">
					{aboutCounter.map((item, index) => (
						<RenderCount key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
