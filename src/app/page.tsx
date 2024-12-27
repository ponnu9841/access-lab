import WhyUs from "@/components/section/why-us";
import ImageScroll from "@/components/horizontal-image-scroll";
// import TitleBadge from "@/components/custom/title-badge";
import { Metadata } from "next";
// import Heading from "@/components/custom/heading";
import ImageGallery from "@/components/section/gallery";
import HomeSlider from "@/components/section/home-slider";
import Testimonials from "@/components/testimonials";
import {
	galleryImages,
	heroData,
	images,
	testimonials,
} from "@/services/dummyData";
import About from "@/components/section/about";
import BannerWhy from "@/components/section/banner-why";
import ServiceCards from "@/components/section/service-cards";
import Team from "@/components/section/teams";

export const metadata: Metadata = {
	title: "Home Page",
	description: "Home Page description",
};

export default function HomePage() {
	return (
		<>
			<HomeSlider sliderData={heroData} />
			<div className="bg-primary/5">
				<ServiceCards />

				<section className="pb-32 pt-0">
					<WhyUs />
				</section>
			</div>
			<section className="container">
				<ImageGallery imagesArray={galleryImages} />
			</section>
			<section className="container pt-0 pb-24">
				<Testimonials testimonials={testimonials} />
			</section>
			<section className="pt-0">
				<ImageScroll images={images} />
			</section>
			<section className="py-28 bg-primary/5 relative before:content-[''] lg:before:absolute lg:before:top-0 lg:before:right-0 lg:before:w-[45%] lg:before:h-full lg:before:bg-primary">
				<About />
			</section>
			<section className="pt-0">
				<Team />
			</section>
			<section className="pt-0 mb-96">
				<BannerWhy />
			</section>
		</>
	);
}
