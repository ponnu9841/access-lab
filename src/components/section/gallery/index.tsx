// "use client";

import { useEffect, useState } from "react";
import Heading from "../../custom/heading";
import NextImage from "../../Image";
// import TitleBadge from "../../custom/title-badge";
// import { Link as LinkIcon } from "lucide-react";
import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { fetchGallery } from "@/redux/features/gallery-slice";
import ZoomAnimation from "@/components/animation/zoom-animation";
import GalleryDialog from "@/components/gallery-dialog";
import { getCurrentSectionHeading } from "@/utils";

interface GalleryImagesProps {
  imagesArray: Gallery[];
  heading: Heading[];
}

export default function ImageGallery(props: GalleryImagesProps) {
  const { imagesArray } = props;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { gallery } = useAppSelector((state) => state.rootReducer.gallery);
  const dispatch = useAppDispatch();
  const images = gallery?.data?.length ? gallery?.data : imagesArray;
  const galleryHeading = getCurrentSectionHeading(props.heading, "gallery");

  const openDialog = (id: string) => setSelectedImage(id);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchGallery({ controller }));
    return () => controller.abort();
  }, []); //eslint-disable-line

  return (
    <div>
      {/* <div className="flex justify-center items-center mb-2">
				<TitleBadge title="gallery" />
			</div> */}
      <Heading
        title={galleryHeading?.title || "Image Gallery"}
        className="text-center mb-8"
        animation="fadeInDown"
      />
      {/* <div className="flex flex-wrap justify-center items-start gap-4">
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
			</div> */}
      <CarouselSlider
        carouselContentClassName="justify-stretch max-w-[100%] mb-8"
        id="gallery-slider"
      >
        {images?.map((image, index) => (
          <RenderCarouselItem
            key={index}
            carouselItemClassName="basis-full md:basis-1/2 lg:basis-1/4"
            cardClassName="rounded-sm relative border-none"
            cardContentClassName={`flex flex-col items-between justify-center w-full`}
          >
            <div
              key={index}
              className={
                "group relative flex-1 min-w-[calc(50%-0.5rem)] md:min-w-[calc(32%-0.333rem)] h-22 cursor-pointer transition-opacity aspect-square mx-4"
              }
              onClick={() => openDialog(image.id)}
            >
              <div className="absolute inset-0 rounded-sm bg-black bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition z-10 flex justify-center items-center">
                {/* <div className="p-3 rounded-full bg-background">
                  <LinkIcon size={15} />
                </div> */}
              </div>
              <ZoomAnimation>
                <div className="aspect-square">
                  <NextImage
                    src={image.image}
                    alt={image.alt || ""}
                    className="rounded-sm overflow-hidden"
                    imageClassName="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </ZoomAnimation>
            </div>
          </RenderCarouselItem>
        ))}
      </CarouselSlider>

      <Link href="/gallery" className="flex justify-center">
        <Button variant="link" className="text-lg underline">
          View All
        </Button>
      </Link>

      {images.length && (
        <GalleryDialog
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
      )}
    </div>
  );
}
