import Heading from "@/components/custom/heading";
import TitleBadge from "@/components/custom/title-badge2";
import TitleDescription from "@/components/custom/title-desc";
// import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import ParallaxTiltMultiple from "@/components/ui/parallax/parallax-multiple";
// import ParallaxTilt from "@/components/ui/parallax/parallax-tilt";

export default function AboutNew() {
	return (
		<div className="container">
			<Heading
				title="We are a full-service creative agency"
				className="text-center"
			/>
			<div className="mx-auto text-center max-w-lg">
				<TitleDescription desc="Our team of designers, developers and creatives are perfectionists who love what they do and love" />
			</div>
			<div className="lg:flex gap-16 flex-wrap items-stretch mt-12">
				<div className="lg:w-[calc(60%-2rem)] min-h-[400px] md:min-h-[550px]">
					<ParallaxTiltMultiple
						leftImage="/about/home_agency_about_2.jpg"
						rightImage="/about/home_agency_about_1.jpg"
					/>
				</div>
				<div className="flex-1 lg:mb-24">
					<div className="max-w-md">
						<TitleBadge title="Every day brings new challenges" />
						<Heading
							title="Creative agency focused on vision, product and people"
							variant="h3"
							className="font-bold my-6"
						/>
						<TitleDescription
							desc="We’re boldly individual, always original and refreshingly easy-going. Our vision, passion and ideas are matched with focus, expertise and flair."
							className="font-normal text-base mb-6"
						/>
						<Button size="lg">About Us</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
