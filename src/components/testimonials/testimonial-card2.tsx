import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import NextImage from "@/components/Image";

type TestimonialProps = {
	testimonial: Testimonial;
};

export default function TestimonialCard(props: TestimonialProps) {
	const { testimonial } = props;
	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
			<NextImage
				src={testimonial.avatarImage || "/no-image.png"}
				className="aspect-square col-span-2 max-h-[300px]"
			/>
			<div className="relative col-span-3">
				<BiSolidQuoteAltLeft
					className="absolute left-0 -top-[3rem] text-primary/15"
					size={80}
				/>
				<BiSolidQuoteAltRight
					className="absolute right-0 bottom-0 text-primary/15"
					size={80}
				/>
				<p className="mt-8">{testimonial.testimonial}</p>

                <div className="mt-12">
                    <div className="text-xl uppercase font-bold">{testimonial.name}</div>
                    <div className="text-base">{testimonial.role}</div>
                </div>
			</div>
		</div>
	);
}
