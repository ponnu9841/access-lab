import Image from "next/image";
import { MdDelete, MdCloudUpload } from "react-icons/md";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";

type ImageUploadPropsType = {
	images: ExtendedFile[] | [];
	setImages: React.Dispatch<React.SetStateAction<ExtendedFile[] | []>>;
	multiple?: boolean;
};

const ImageUpload = (props: ImageUploadPropsType) => {
	const { images, setImages, multiple = false } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

	useEffect(() => {
		if (images.length === 0) setSelectedImages([]);
		else setSelectedImages(images.map((image) => image.url));
	}, [images]);

	const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const files = Array.from(event.target.files) as ExtendedFile[];
			if (multiple) {
				files.forEach((file) => {
					const url = URL.createObjectURL(file);
					file.url = url;
					setImages((previousImages) => [...previousImages, file]);
					// setSelectedImages((previousUrls) => [...previousUrls, url]);
				});
			} else if (files.length > 0) {
				const url = URL.createObjectURL(files[0]);
				files[0].url = url;
				setImages([files[0]]);
				// setSelectedImages([url]);
			}
		}

		// FOR BUG IN CHROME
		event.target.value = "";
	};

	const deleteHandler = (url: string) => {
		setImages((previousImages) =>
			previousImages.filter((file) => file.url !== url)
		);
		setSelectedImages((previousUrls) =>
			previousUrls.filter((image) => image !== url)
		);
	};

	return (
		<div
			className={`flex items-center gap-6 ${
				multiple ? "flex-col" : "flex-row"
			}`}
		>
			{selectedImages.length < 10 && (
				<>
					<label>
						<Button
							onClick={() => {
								inputRef.current?.click();
							}}
							type="button"
						>
							<MdCloudUpload />
							{`Select Image${multiple ? "s" : ""}`}
						</Button>
						{/* <AddIcon /> */}
						<input
							type="file"
							className="hidden"
							name="images"
							onChange={onSelectFile}
							multiple
							accept="image/png , image/jpeg, image/webp"
							ref={inputRef}
						/>
					</label>
				</>
			)}

			{selectedImages?.length >= 10 && (
				<div className="text-red-500 py-3">
					You can`t upload more than 10 images! <br />
				</div>
			)}

			{selectedImages.length > 0 && (
				<div className="mt-3 flex items-center gap-3 flex-wrap max-h-[200px] overflow-y-auto">
					{selectedImages?.map((image: string) => {
						return (
							<div
								key={image}
								className="aspect-square relative flex items-center justify-center"
							>
								<Image src={image} width={100} height={100} alt="upload" />
								<div className="absolute top-0 right-0 bg-red-500 rounded-full flex items-center justify-center">
									<Button
										aria-label="delete"
										size="sm"
										onClick={() => deleteHandler(image)}
										type="button"
									>
										<MdDelete />
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
