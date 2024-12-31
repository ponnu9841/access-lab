import WhyUs from "@/components/section/why-us";
import ImageScroll from "@/components/horizontal-image-scroll";
import { Metadata } from "next";
import ImageGallery from "@/components/section/gallery";
import HomeSlider from "@/components/section/home-slider";
// import Testimonials from "@/components/testimonials";
import {
	// blogData,
	galleryImages,
	heroData,
	images,
	services,
	// testimonials,
} from "@/services/dummyData";
// import About from "@/components/section/about";
// import BannerWhy from "@/components/section/banner-why";
// import ServiceCards from "@/components/section/service-cards";
// import Team from "@/components/section/teams";
// import Blog from "@/components/section/blog";
import AboutNew from "@/components/section/about/about-2";
import Services from "@/components/section/services/services2";

export const metadata: Metadata = {
	title: "Home Page",
	description: "Home Page description",
};

export default function HomePage() {
	return (
		<>
			<HomeSlider sliderData={heroData} />
			{/* <ServiceCards /> */}
			<section>
				<ImageScroll images={images} />
			</section>
			<section className="pb-16">
				<AboutNew />
			</section>
			<section className="pb-16 bg-primary/5">
				<Services services={services} />
			</section>
			<section className="pb-16">
				<WhyUs />
			</section>
			 <section className="container">
				<ImageGallery imagesArray={galleryImages} />
			</section>
			{/*<section className="container pb-32">
				<Testimonials testimonials={testimonials} />
			</section>

			<section className="py-28 bg-primary/5 relative before:content-[''] lg:before:absolute lg:before:top-0 lg:before:right-0 lg:before:w-[45%] lg:before:h-full lg:before:bg-primary">
				<About />
			</section>
			<section>
				<Team />
			</section>
			<section>
				<BannerWhy />
			</section>
			<section className="container mb-96">
				<Blog blogs={blogData} />
			</section> */}
		</>
	);
}
