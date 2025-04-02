import Image from "next/image";

export default function ImageScroll({ images }: { images: Partner[] }) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-scroll">
          {images?.map((partner, index) => (
            <div key={index}>
              <div className="relative aspect-square min-w-[120px] lg:min-w-[160px] max-w-[200px] h-auto flex items-center">
                <Image
                  src={partner.image}
                  fill
                  alt={partner.alt || "partner-logo"}
                  className="my-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
