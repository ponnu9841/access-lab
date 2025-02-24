import { Button } from "@/components/ui/button";
import ServiceCard from "./service-card3";
import SectionTitle from "@/components/custom/section-title";
import Link from "next/link";
import { getCurrentSectionHeading } from "@/utils";

export default function Services({
  services,
  heading,
}: {
  services: Service[];
  heading: Heading[];
}) {
  const serviceHeading = getCurrentSectionHeading(heading, "services");
  return (
    <div className="container">
      <SectionTitle
        title={
          serviceHeading?.title || "We create a unique action plan for brands"
        }
        description={
          serviceHeading?.description ||
          "Get your company heading in the right direction with our digital marketing strategist"
        }
        headingAnimation="fadeInDown"
        descriptionAnimation="fadeInUp"
      />
      {/* <Heading
				title="We create a unique action plan for brands"
				className="text-center"
			/>
			<TitleDescription
				desc="Get your company heading in the right direction with our digital marketing strategist"
				className="mx-auto text-center mb-12 max-w-lg"
			/> */}
      <div className="lg:flex gap-8 mt-12">
        {services?.map((service, index) => {
          if (index <= 3) {
            return (
              <div key={index} className="mb-8 lg:mb-0 flex-1">
                <ServiceCard {...service} />
              </div>
            );
          }
        })}
      </div>
      {services.length > 4 && (
        <div className="text-center mt-3">
          <Link href="/services">
            <Button variant="link">View All</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
