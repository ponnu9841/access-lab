import { FaLinkedinIn } from "react-icons/fa";
import NextImage from "@/components/Image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import AnimateText from "@/components/animation/animate-text";
import BlurAnimation from "@/components/animation/blur-animation";
import parse from "html-react-parser";

export default function TeamCard(props: Teams) {
	const { image, name, designation, alt, linkedin_profile } = props;
	return (
		<>
			<Card className="border-none group w-full relative h-full">
				<div className="aspect-square relative overflow-hidden">
					<NextImage
						src={image}
						className="rounded-sm"
						imageClassName="rounded-sm"
						alt={alt || ""}
					/>
					<div className="absolute right-12 top-0 md:-top-12 md:opacity-0 group-hover:opacity-100 md:group-hover:top-0 transition-ease-in duration-500">
						<div className="flex flex-col bg-primary ">
							{/* <Link
								href="#"
								className="hover:bg-black p-4 transition-all duration-500"
                                target="_blank"
							>
								<FaFacebookF size={20} className="text-white" />
							</Link>
							<Link
								href="#"
								className="hover:bg-black p-4 transition-all duration-500"
                                target="_blank"
							>
								<FaInstagramSquare size={20} className="text-white" />
							</Link> */}
							{linkedin_profile !== null && (
								<Link
									href={linkedin_profile}
									className="hover:bg-black p-4 transition-all duration-500"
									target="_blank"
								>
									<FaLinkedinIn size={20} className="text-white" />
								</Link>
							)}
						</div>
					</div>
				</div>
				<CardContent>
					<div className="border-none bg-background shadow-md w-[calc(100%-8rem)] absolute left-1/2 -translate-x-1/2 -bottom-10 group-hover:-bottom-6 px-6 py-4 transition-all duration-500">
						<h3 className="text-2xl text-center font-semibold">
							<AnimateText text={name} />
						</h3>
						{designation && (
							<div className="text-primary text-sm uppercase text-center font-semibold">
								<BlurAnimation>
									{parse(designation)}
								</BlurAnimation>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
