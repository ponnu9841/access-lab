import WhyUs from "@/components/section/why-us";
import ImageScroll from "@/components/horizontal-image-scroll";
// import TitleBadge from "@/components/custom/title-badge";
import { Metadata } from "next";
// import Heading from "@/components/custom/heading";
import ImageGallery from "@/components/section/gallery";
import HomeSlider from "@/components/section/home-slider";
import Testimonials from "@/components/testimonials";
import { galleryImages, heroData, images, testimonials } from "@/services/dummyData";
import About from "@/components/section/about";

export const metadata: Metadata = {
	title: "Home Page",
	description: "Home Page description",
};

export default function HomePage() {
	return (
		<>
			<HomeSlider sliderData={heroData} />
			<div className="bg-primary/5">
				<section className="pt-12">
					<ImageScroll images={images} />
				</section>
				<section className="pb-32">
					<WhyUs />
				</section>
			</div>
			{/* <section>
				<div>
					<div className="flex flex-col justify-center items-center">
						<TitleBadge title="FACILITIES WE HAVE" />
						<Heading title="What Facilities We Provided" className="mt-4" />
					</div>
				</div>
			</section> */}
			<section>
				<ImageGallery imagesArray={galleryImages} />
			</section>
			<section className="pt-0 container">
				<Testimonials testimonials={testimonials}/>
			</section>
			<section className="pt-0">
				<About />
			</section>
		</>
	);
}
