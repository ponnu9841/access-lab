"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Heading from "../custom/heading";
import NextImage from "../Image";
import TitleBadge from "../custom/title-badge";
import { GalleryImage } from "@/interfaces/gallery-image";
import GalleryDrawerContent from "./gallery-drawer-content";

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
		[]
	);

	const openDialog = (id: number) => setSelectedImage(id);
	const closeDialog = () => setSelectedImage(null);

	// const navigateImage = (direction: "next" | "prev") => {
	// 	if (selectedImage === null) return;
	// 	const currentIndex = images.findIndex((img) => img.id === selectedImage);
	// 	const newIndex =
	// 		direction === "next"
	// 			? (currentIndex + 1) % images.length
	// 			: (currentIndex - 1 + images.length) % images.length;
	// 	console.log(newIndex);

	// 	setSelectedImage(images[newIndex].id);
	// };

	return (
		<div className="container pb-32">
			<div className="flex justify-center items-center mb-2">
				<TitleBadge title="gallery" />
			</div>
			<Heading title="Image Gallery" className="text-center mb-8" />
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-content-center"> */}
			<div className="flex flex-wrap justify-center items-start gap-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="w-[calc(50%-0.5rem)] md:w-[calc(32%-0.3333rem)] 2xl:w-[calc(20%_-_0.25rem)] h-22 cursor-pointer hover:opacity-80 transition-opacity aspect-square"
						onClick={() => openDialog(image.id)}
					>
						<div className="aspect-square">
							<NextImage
								src={image.src}
								alt={image.alt}
								className="rounded-sm overflow-hidden"
								imageClassName="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
							/>
						</div>
					</div>
				))}
			</div>

			<Dialog open={selectedImage !== null} onOpenChange={closeDialog}>
				<DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full p-5 text-white">
					{selectedImage && (
						// <div className="relative w-full h-full">
						// 	<DialogTitle
						// 		aria-describedby=""
						// 		className="text-center relative z-10 mt-2"
						// 	>
						// 		{images.find((img) => img.id === selectedImage)?.alt || ""}
						// 	</DialogTitle>
						// 	<Image
						// 		src={images.find((img) => img.id === selectedImage)?.src || ""}
						// 		alt={images.find((img) => img.id === selectedImage)?.alt || ""}
						// 		fill
						// 		className="object-contain"
						// 	/>
						// 	<Button
						// 		variant="outline"
						// 		size="icon"
						// 		className="absolute top-1/2 left-4 transform -translate-y-1/2 text-foreground"
						// 		onClick={() => navigateImage("prev")}
						// 	>
						// 		<ChevronLeft className="h-4 w-4" />
						// 	</Button>
						// 	<Button
						// 		variant="outline"
						// 		size="icon"
						// 		className="absolute top-1/2 right-4 transform -translate-y-1/2 text-foreground"
						// 		onClick={() => navigateImage("next")}
						// 	>
						// 		<ChevronRight className="h-4 w-4" />
						// 	</Button>
						// </div>
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
