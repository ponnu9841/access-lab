import { FaFacebookF, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import NextImage from "@/components/Image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type TeamsCardProps = {
	image: string;
	name: string;
	designation: string;
};

export default function TeamCard(props: TeamsCardProps) {
	const { image, name, designation } = props;
	return (
		<>
			<Card className="border-none group w-full relative h-full">
				<div className="aspect-square relative overflow-hidden">
					<NextImage
						src={image}
						className="rounded-sm"
						imageClassName="rounded-sm"
					/>
					<div className="absolute right-12 -top-12 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-ease-in duration-500">
						<div className="flex flex-col bg-primary ">
							<Link
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
							</Link>
							<Link
								href="#"
								className="hover:bg-black p-4 transition-all duration-500"
                                target="_blank"
							>
								<FaPinterest size={20} className="text-white" />
							</Link>
						</div>
					</div>
				</div>
				<CardContent>
					<div className="border-none bg-background shadow-md w-[calc(100%-8rem)] absolute left-1/2 -translate-x-1/2 -bottom-10 group-hover:-bottom-6 px-6 py-4 transition-all duration-500">
						<h3 className="text-2xl text-center font-semibold">{name}</h3>
						<p className="text-primary text-sm uppercase text-center font-semibold">
							{designation}
						</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
