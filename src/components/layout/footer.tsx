import NextImage from "@/components/Image";
import {
	FaSquareFacebook,
	FaSquareXTwitter,
	FaSquareInstagram,
} from "react-icons/fa6";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const serviceLinks = ["Marketing", "SEO/SEM", "Development", "UX Design"];

const productLinks = [
	"Elementor Guru",
	"WooLentor Pro",
	"Plugins",
	"Page Builder",
];

const aboutLinks = [
	"Features",
	"Our Partners",
	"Affiliate Programs",
	"Pricing",
];

export default function Footer() {
	return (
		<footer className="pt-20 pb-6 bg-black text-white">
			<div className="container">
				<div className="flex flex-wrap gap-8 mb-16">
					<div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)]">
						<NextImage
							src="/logo.svg"
							className="aspect-square max-w-[100px] max-h-[100px]"
						/>
						<div className="mt-8">
							<div className="text-base mb-2">
								<Link href="tel:(+1) 212-946-2701">(+1) 212-946-2701</Link>
							</div>
							<div className="text-base">
								<Link href="mailto:hello@hasagency.com">
									hello@hasagency.com
								</Link>
							</div>
						</div>
						<div className="mt-8 flex gap-x-2">
							<div>
								<Link href="#" target="_blank">
									<FaSquareFacebook
										size={25}
										className="text-muted-foreground hover:text-primary transition-all duration-300"
									/>
								</Link>
							</div>
							<div>
								<Link href="#" target="_blank">
									<FaSquareXTwitter
										size={25}
										className="text-muted-foreground hover:text-primary transition-all duration-300"
									/>
								</Link>
							</div>
							<div>
								<Link href="#" target="_blank">
									<FaSquareInstagram
										size={25}
										className="text-muted-foreground hover:text-primary transition-all duration-300"
									/>
								</Link>
							</div>
						</div>
					</div>
					<div className="w-full md:w-[calc(50%-1rem)] lg:flex-1 lg:flex gap-6">
						<div className="lg:flex-1">
							<div className="text-xl font-semibold mb-4">Services</div>
							{serviceLinks.map((item, index) => (
								<div key={index} className="mb-3">
									<Link
										href="#"
										target="_blank"
										className="hover:text-primary transition-all duration-300"
									>
										{item}
									</Link>
								</div>
							))}
						</div>
						<div className="lg:flex-1">
							<div className="text-xl font-semibold mb-4">Products</div>
							{productLinks.map((item, index) => (
								<div key={index} className="mb-3">
									<Link
										href="#"
										target="_blank"
										className="hover:text-primary transition-all duration-300"
									>
										{item}
									</Link>
								</div>
							))}
						</div>
						<div className="lg:flex-1">
							<div className="text-xl font-semibold mb-4">About</div>
							{aboutLinks.map((item, index) => (
								<div key={index} className="mb-3">
									<Link
										href="#"
										target="_blank"
										className="hover:text-primary transition-all duration-300"
									>
										{item}
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
				<Separator />
				<div className="flex justify-center mt-6">
					<div>
						© 2025 Access Developed by{" "}
						<Link
							href="https://www.linkedin.com/in/ponnu-sudesh-017b0823b/"
							target="_blank"
							className="hover:text-primary transition-all duration-300"
						>
							PonnuSudesh
						</Link>
						.
					</div>
				</div>
			</div>
		</footer>
	);
}
