import RenderAvatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/heading";
import TitleBadge from "@/components/custom/title-badge";
import StethoscopeIcon from "@/icons/stethoscope";
import React from "react";

export default function About() {
	return (
		<div className="bg-primary md:flex items-center mb-96">
			<div className="bg-background">
				<TitleBadge title="About Us" />
				<Heading title="Joining Hands with Techno Easement" variant="h2" />
				<p className="text-muted-foreground text-sm">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry`s standard dummy text
				</p>
				<div className="flex space-x-3 items-centger">
                    <RenderAvatar
                        image={<StethoscopeIcon />}
                        avatarImageClassName="p-3 bg-primary text-white"
                    />
					
					<Heading title="Infection Prevention" variant="h3" className="font-semibold text-lg" />
				</div>
			</div>
			<div></div>
		</div>
	);
}
