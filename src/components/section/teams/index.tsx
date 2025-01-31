import { useEffect } from "react";
import TeamCard from "./teams-card";
import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
// import TitleBadge from "@/components/custom/title-badge";
import Heading from "@/components/custom/heading";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { fetchTeams } from "@/redux/features/teams-slice";
import { useAppSelector } from "@/redux/hooks/use-selector";

const teamsData: Teams[] = [
	{
		id: "1",
		image: "/teams/1.jpg",
		alt: null,
		name: "Naiden Smith",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
	{
		id: "2",
		image: "/teams/2.jpg",
		alt: null,
		name: "Daniel Frankie",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
	{
		id: "3",
		image: "/teams/3.jpg",
		alt: null,
		name: "Alex Jhon",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
	{
		id: "4",
		image: "/teams/3.jpg",
		alt: null,
		name: "Alex Jhon",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
	{
		id: "5",
		image: "/teams/4.jpg",
		alt: null,
		name: "Rihana Roy",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
	{
		id: "6",
		image: "/teams/5.jpg",
		alt: null,
		name: "Jason Roy",
		designation: "outpatient surgery",
		linkedin_profile: "#",
	},
];

export default function Team() {
	const dispatch = useAppDispatch();
	const { loading, data } = useAppSelector((state) => state.rootReducer.teams);

	let teams = teamsData;

	if (!loading && data.length > 0) {
		teams = data;
	}

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchTeams(controller));
		// dispatch partner
		return () => controller.abort();
	}, []); //eslint-disable-line
	return (
		<>
			{/* <div className="flex justify-center mb-4">
				<TitleBadge title="Our Team" />
			</div> */}
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
