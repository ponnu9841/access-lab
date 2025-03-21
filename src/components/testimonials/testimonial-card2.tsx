import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import NextImage from "@/components/Image";
import parse from "html-react-parser";
import BlurAnimation from "@/components/animation/blur-animation";
import AnimateText from "@/components/animation/animate-text";
import ZoomAnimation from "@/components/animation/zoom-animation";

type TestimonialProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard(props: TestimonialProps) {
  const { testimonial } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <ZoomAnimation className="col-span-2">
        {testimonial.image && (
          <NextImage
            src={testimonial.image}
            className="aspect-square max-h-[300px]"
          />
        )}
        {testimonial.vido_url && (
          <iframe className="w-full h-[300px]" src={testimonial.vido_url} />
        )}
      </ZoomAnimation>
      <div className="relative col-span-3">
        <BiSolidQuoteAltLeft
          className="absolute left-0 -top-[3rem] text-primary/15"
          size={80}
        />
        <BiSolidQuoteAltRight
          className="absolute right-0 bottom-0 text-primary/15"
          size={80}
        />
        <BlurAnimation>
          <div className="mt-8">{parse(testimonial.testimonial)}</div>
        </BlurAnimation>

        <div className="mt-12">
          <div className="text-xl uppercase font-bold">
            <AnimateText text={testimonial.name} />
          </div>
          <BlurAnimation>
            <div>{parse(testimonial.designation || "")}</div>
          </BlurAnimation>
        </div>
      </div>
    </div>
  );
}
