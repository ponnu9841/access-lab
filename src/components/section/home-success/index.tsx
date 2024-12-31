import CustomSlider from "@/components/custom-slider";
import SectionHeading from "@/components/custom/section-heading";
import SectionLayout from "@/components/custom/section-layout";
import TitleBadge from "@/components/custom/title-badge2";
import ParallaxTiltMultiple from "@/components/ui/parallax/parallax-multiple";
import React from "react";

export default function HomeSuccess() {
	return (
		<div className="container">
			<SectionLayout
				sectionLeft={
					<ParallaxTiltMultiple
						leftImage="/success/skill-2.jpg"
						rightImage="/success/skill-1.jpg"
					/>
				}
				sectionRight={
					<div>
						<TitleBadge title="Your success is our success" />
						<SectionHeading
							title="Web design, marketing & SEO solutions that get results"
						/>
                        <div className="flex flex-col gap-y-8">
                            <CustomSlider
                                title="UX Design"
                                value={81}
                                backgroundColor="bg-primary"
                            />
                            <CustomSlider
                                title="Marketing"
                                value={72}
                                backgroundColor="bg-primary"
                            />
                            <CustomSlider
                                title="Web Design"
                                value={81}
                                backgroundColor="bg-primary"
                            />
                            <CustomSlider
                                title="Development"
                                value={81}
                                backgroundColor="bg-primary"
                            />
                        </div>

					</div>
				}
				// sectionRight={
				//     <ParallaxTiltMultiple
				// 		leftImage="/success/skill-2.jpg"
				// 		rightImage="/success/skill-1.jpg"
				//         leftImageSize={
				//             sm: 250,
				//             md: 500
				//         }
				// 	/>
				// }
			/>
		</div>
	);
}
