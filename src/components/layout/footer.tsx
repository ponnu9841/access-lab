import NextImage from "@/components/Image";
import {
	FaSquareFacebook,
	FaSquareXTwitter,
	FaSquareInstagram,
} from "react-icons/fa6";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FooterData from "./footer-data";
import { navItems } from "./navbar";

const usefulLinks = [
	{name: 'FAQ', link: "/faq"},
	{name: "Terms & Conditions", link: "/terms-and-conditions"},
	{name: "Privacy Policy", link: "/privacy-policy"},
	{name: "Cancellation Policy", link: "/cancellation-policy"},
	{name: "Refund Policy", link: "/refund-policy"},
	{name: "Grievance Officer", link: "/grievance-officer"},
];

export default function Footer() {
	
	return (
		<footer className="pt-10 md:pt-20 pb-6 bg-black text-white">
			<div className="container">
				<div className="flex flex-wrap gap-8 mb-8 md:mb-16">
					<div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)]">
						<NextImage
							src="/logo.svg"
							className="aspect-square max-w-[100px] max-h-[100px]"
						/>
						<div className="mt-8">
							<FooterData />
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
							<div className="text-xl font-semibold mb-4">Quick Links</div>
							{navItems.map((item, index) => (
								<div key={index} className="mb-2">
									<Link
										href={item.link}
										className="hover:text-primary transition-all duration-300"
									>
										{item.name}
									</Link>
								</div>
							))}
						</div>
						{/* <div className="lg:flex-1">
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
						</div> */}
						<div className="lg:flex-1">
							<div className="text-xl font-semibold mb-4">Userful Links</div>
							{usefulLinks.map((item, index) => (
								<div key={index} className="mb-2">
									<Link
										href={item.link}
										className="hover:text-primary transition-all duration-300"
									>
										{item.name}
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
				<Separator />
				<div className="mt-6 text-center">
					© 2025 Access Home Lab Solutions LLP. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
