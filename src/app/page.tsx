import WhyUs from "@/components/why-us";
import HomeSlider from "@/components/home-slider";
import ImageScroll from "@/components/horizontal-image-scroll";
// import TitleBadge from "@/components/custom/title-badge";
import { Metadata } from "next";
// import Heading from "@/components/custom/heading";
import ImageGallery from "@/components/gallery";

export const metadata: Metadata = {
	title: "Home Page",
	description: "Home Page description",
};

const images = [
	"/partner-logo-1.png",
	"/partner-logo-2.png",
	"/partner-logo-3.png",
	"/partner-logo-4.png",
	"/partner-logo-5.png",
	"/partner-logo-6.png",
	// "/partner-logo-7.png",
	// "/partner-logo-8.jpg",
	// "/partner-logo-9.png",
	// "/partner-logo-7.png",
	// "/partner-logo-8.jpg",
	// "/partner-logo-9.png",
];

const galleryImages = [
	{ src: "/service-1.jpg", alt: "Image 1" },
	{ src: "/service-2.jpg", alt: "Image 2" },
	{ src: "/service-3.jpg", alt: "Image 3" },
	{ src: "/hero-1.jpg", alt: "Image 3" },
	{ src: "/hero-2.jpg", alt: "Image 3" },
	{ src: "/hero-3.jpg", alt: "Image 3" },
	{ src: "/about.jpeg", alt: "Image 3" },
	{ src: "/partner-logo-1.png", alt: "Image 3" },
	{ src: "/partner-logo-2.png", alt: "Image 3" },
	{ src: "/partner-logo-3.png", alt: "Image 3" },
	{ src: "/partner-logo-4.png", alt: "Image 3" },
	{ src: "/partner-logo-5.png", alt: "Image 3" },
	{ src: "/partner-logo-6.png", alt: "Image 3" },
	{ src: "/partner-logo-7.png", alt: "Image 3" },
	{ src: "/partner-logo-8.jpg", alt: "Image 3" },
	{ src: "/partner-logo-9.png", alt: "Image 3" },
];

export default function HomePage() {
	return (
		<>
			<HomeSlider />
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
				<ImageGallery imagesArray={galleryImages}/>
			</section>
		</>
	);
}
