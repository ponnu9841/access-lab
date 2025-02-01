import { BiSolidQuoteAltRight } from "react-icons/bi";
import React from "react";
// import TitleBadge from "../custom/title-badge";
// import RenderAvatar from "../custom/Avatar";

type TestimonialProps = {
	testimonial: Testimonial;
};
export default function TestimonialCard(props: TestimonialProps) {
	const { testimonial } = props;
	return (
		<div>
			<p className="text-muted-foreground line-clamp-5 break-all max-w-md leading-6">
				{testimonial.testimonial}
			</p>
			<div className="mt-4 flex items-center gap-3">
				<div>
					{/* <RenderAvatar
						name={testimonial.name}
						image={testimonial.avatarImage}
						avatarFallbackClassName="bg-primary text-white"
					/> */}
				</div>
				<div>
					<h3 className="font-bold text-lg">{testimonial.name}</h3>
					{/* <TitleBadge
						title={testimonial.role}
						className="text-xs text-secondary bg-primary/10"
					/> */}
				</div>
			</div>
			<BiSolidQuoteAltRight
				className="absolute right-0 bottom-0 text-primary/15"
				size={60}
			/>
		</div>
	);
}
