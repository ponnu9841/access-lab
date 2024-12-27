"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Heading from "../../custom/heading";
import NextImage from "../../Image";
import TitleBadge from "../../custom/title-badge";
import GalleryDrawerContent from "./gallery-drawer-content";
import { Link } from "lucide-react";

interface GalleryImagesProps {
	imagesArray: GalleryImage[];
}

export default function ImageGallery(props: GalleryImagesProps) {
	const { imagesArray } = props;
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const images = useMemo(
		() =>
			imagesArray.map((image, index) => ({
				...image,
				id: index + 1,
			})),
		[imagesArray]
	);

	const openDialog = (id: number) => setSelectedImage(id);
	const closeDialog = () => setSelectedImage(null);

	return (
		<div>
			<div className="flex justify-center items-center mb-2">
				<TitleBadge title="gallery" />
			</div>
			<Heading title="Image Gallery" className="text-center mb-8" />
			<div className="flex flex-wrap justify-center items-start gap-4">
				{images.map((image, index) => (
					<div
						key={index}
						className={
							"group relative flex-1 min-w-[calc(50%-0.5rem)] md:min-w-[calc(32%-0.333rem)] h-22 cursor-pointer transition-opacity aspect-square"
						}
						onClick={() => openDialog(image.id)}
					>
						<div className="absolute inset-0 rounded-sm bg-black bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition z-10 flex justify-center items-center">
							<div className="p-3 rounded-full bg-background">
								<Link size={15} />
							</div>
						</div>
						<div className="aspect-square">
							<NextImage
								src={image.src}
								alt={image.alt}
								className="rounded-sm overflow-hidden"
								imageClassName="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
							/>
						</div>
					</div>
				))}
			</div>

			<Dialog open={selectedImage !== null} onOpenChange={closeDialog}>
				<DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full p-5 text-white bg-transparent border-none">
					{selectedImage && (
						<GalleryDrawerContent
							images={images}
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
