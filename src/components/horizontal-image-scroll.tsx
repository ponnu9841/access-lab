import Image from "next/image";
import React, { Fragment } from "react";

export default function ImageScroll({ images }: { images: Partner[] }) {
	return (
		<>
			<div className="scroller overflow-hidden mask-x">
				<div className="scroller-inner flex w-fit animate-scroll">
					{[...Array(images?.length > 5 ? 3 : 5)].map((_, i) => (
						<Fragment key={i}>
							{images?.map((partner, index) => (
								<div className="px-6" key={index}>
									<div className="relative aspect-square min-w-[120px] max-w-[200px] h-auto flex items-center">
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
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
}
