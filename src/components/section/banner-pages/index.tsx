import Heading from "@/components/custom/heading";
import NextImage from "@/components/Image";

export default function BannerPages({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative">
      <NextImage
        src={image}
        imageClassName="object-cover"
        className="w-full min-h-[60vh]"
      />
      <div className="absolute inset-0 w-full h-full bg-black/40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Heading
          title={title}
          className="text-white font-bold tracking-wider"
          variant="h1"
        />
      </div>
    </div>
  );
}
