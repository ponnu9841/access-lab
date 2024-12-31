import React from "react";
import TeamCard from "./teams-card";
import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
import TitleBadge from "@/components/custom/title-badge";
import Heading from "@/components/custom/heading";

const teams = [
	{
		image: "/teams/1.jpg",
		name: "Naiden Smith",
		designation: "outpatient surgery",
	},
	{
		image: "/teams/2.jpg",
		name: "Daniel Frankie",
		designation: "outpatient surgery",
	},
	{
		image: "/teams/3.jpg",
		name: "Alex Jhon",
		designation: "outpatient surgery",
	},
	{
		image: "/teams/3.jpg",
		name: "Alex Jhon",
		designation: "outpatient surgery",
	},
	{
		image: "/teams/4.jpg",
		name: "Rihana Roy",
		designation: "outpatient surgery",
	},
	{
		image: "/teams/5.jpg",
		name: "Jason Roy",
		designation: "outpatient surgery",
	},
];

export default function Team() {
	return (
		<>
            <div className="flex justify-center mb-4"><TitleBadge title="Our Team" /></div>
            <Heading title="Meet Our Dedicated Team" className="text-center mb-12" />
		    <CarouselSlider
    			carouselContentClassName="justify-stretch max-w-[100%] pb-16"
    			id="teams-slider"
    		>
    			{teams.map((team, index) => (
    				<RenderCarouselItem
    					key={index}
    					carouselItemClassName="basis-full md:basis-1/2 lg:basis-1/3"
    					cardClassName="rounded-sm relative border-none"
    					cardContentClassName={`flex flex-col items-between justify-center w-full`}
    				>
    					<TeamCard key={index} {...team} />
    				</RenderCarouselItem>
    			))}
    		</CarouselSlider>
		</>
	);
}
