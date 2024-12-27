import React from "react";
import ServiceCard from "./service-card";
import Doctor from "@/icons/doctor";
import DoctorAlternate from "@/icons/doctor-alternate";
import MedicalCare from "@/icons/medical-care";
import MedicalHistory from "@/icons/medical-history";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
	{
		title: "Emergency Cases",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
		icon: <Doctor />,
		hoverIcon: <Doctor />,
	},
	{
		title: "Doctors Timetable",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
		icon: <DoctorAlternate />,
		hoverIcon: <DoctorAlternate />,
	},
	{
		title: "Opening Hours",
		icon: <MedicalCare />,
		hoverIcon: <MedicalHistory />,
	},
];

export default function ServiceCards() {
	return (
		<div className="container">
			<div className="relative -top-24 flex flex-wrap justify-center gap-6">
				<div className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.5rem)] flex justify-center">
					<ServiceCard {...services[0]} variant="secondary">
						<div className="flex gap-x-2 items-center">
							<div className="bg-background rounded-full p-3">
								<FaPhone className="text-secondary" size={20} />
							</div>
							<Link href="tel:92880 08801" className="text-2xl">
								92880 08801
							</Link>
						</div>
					</ServiceCard>
				</div>
				<div className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.5rem)] flex justify-center">
					<ServiceCard {...services[1]} variant="primary">
						<Button className="mt-4" variant="secondary" size="lg">
							TIME TABLE +
						</Button>
					</ServiceCard>
				</div>
				<div className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.33rem)] flex justify-center">
					<ServiceCard {...services[2]} variant="secondary">
						<div className="flex flex-col gap-y-2 text-base">
							<div className="flex justify-between items-center pb-2 border-b border-primary/20 mt-4">
								<div>Monday - Friday</div>
								<div>8.00 - 7.00 PM</div>
							</div>
							<div className="flex justify-between items-center  pb-2 border-b border-primary/20">
								<div>Saturday</div>
								<div>6.00 - 5.00 PM</div>
							</div>
							<div className="flex justify-between items-center  pb-2 border-b border-primary/20">
								<div>Sunday</div>
								<div>9.00 - 4.00 PM</div>
							</div>
							<div className="flex justify-between items-center">
								<div>Emergency</div>
								<div>24HRS 7Days</div>
							</div>
						</div>
					</ServiceCard>
				</div>
			</div>
		</div>
	);
}
