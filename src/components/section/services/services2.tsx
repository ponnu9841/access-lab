import Heading from "@/components/custom/heading";
import TitleDescription from "@/components/custom/title-desc";
import ServiceCard from "./service-card2";

export default function Services({ services }: { services: Service[] }) {
	return (
		<div className="container">
			<Heading
				title="We create a unique action plan for brands"
				className="text-center"
			/>
			<TitleDescription
				desc="Get your company heading in the right direction with our digital marketing strategist"
				className="mx-auto text-center mb-12 max-w-lg"
			/>
			<div className="lg:flex gap-8">
				{services.map((service, index) => (
					<div key={index} className="mb-8 lg:mb-0">
						<ServiceCard {...service} />
					</div>
				))}
			</div>
		</div>
	);
}
