import SectionTitle from "@/components/custom/section-title";
import React from "react";
import ContactCard, { ContactCardProps } from "./contact-card";

export default function Contact(props: { contactData: ContactCardProps[] }) {
	const { contactData } = props;
	return (
		<>
			<SectionTitle
				title="We are a full-service creative agency"
				description="Our team of designers, developers and creatives are perfectionists who love what they do and love"
			/>
			<div className="py-12">
				<div className="flex flex-wrap justify-center gap-8">
					{contactData.map((item, index) => (
						<div
							className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)]"
							key={index}
						>
							<ContactCard {...item} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
