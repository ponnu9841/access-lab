import ServiceCard from "./service-card2";
import SectionTitle from "@/components/custom/section-title";

export default function Services({ services }: { services: Service[] }) {
	return (
		<div className="container">
			<SectionTitle
				title="We create a unique action plan for brands"
				description="Get your company heading in the right direction with our digital marketing strategist"
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
				{services.map((service, index) => (
					<div key={index} className="mb-8 lg:mb-0">
						<ServiceCard {...service} />
					</div>
				))}
			</div>
		</div>
	);
}
