import SectionHeading from "@/components/custom/section-heading";
import SectionLayout from "@/components/custom/section-layout";
import SectionTitle from "@/components/custom/section-title";
import TitleBadge from "@/components/custom/title-badge2";
import { Button } from "@/components/ui/button";
import ParallaxTiltMultiple from "@/components/ui/parallax/parallax-multiple";

export default function AboutNew() {
	return (
		<div className="container">
			<SectionTitle
				title="We are a full-service creative agency"
				description="Our team of designers, developers and creatives are perfectionists who love what they do and love"
			/>
			<div className="mt-12">
				<SectionLayout
					sectionLeft={
						<ParallaxTiltMultiple
							leftImage="/about/home_agency_about_2.jpg"
							rightImage="/about/home_agency_about_1.jpg"
						/>
					}
					sectionRight={
						<div className="max-w-md">
							<TitleBadge title="Every day brings new challenges" />
							<SectionHeading
								title="Creative agency focused on vision, product and people"
								description="We’re boldly individual, always original and refreshingly easy-going. Our vision, passion and ideas are matched with focus, expertise and flair."
							/>
							<Button size="lg">About Us</Button>
						</div>
					}
				/>
			</div>
		</div>
	);
}
