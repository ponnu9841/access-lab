import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	fetchTestimonial,
	setSelectedTestimonial,
} from "@/redux/features/testimonial-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import React from "react";
import { MdEdit } from "react-icons/md";
import { DeleteDrawer } from "../delete-drawer";
import axiosClient from "@/axios/axios-client";
import parse from "html-react-parser";

export default function Testimonials() {
	const dispatch = useAppDispatch();
	const { loading, data } = useAppSelector(
		(state) => state.rootReducer.testimonial
	);

	const deleteTestimonial = async (id: string, image: string | undefined) => {
		try {
			const response = await axiosClient.delete(`/testimonial`, {
				params: { id, image},
			});
			if (response && response.status === 200) {
				dispatch(fetchTestimonial());
			}
		} catch (error) {
			throw error;
		}
	};
	console.log(data);
	return (
		<div className="grid grid-cols-2 gap-6 max-h-[500px] overflow-auto">
			{!loading && data.length === 0 && (
				<div className="col-span-4 text-center mt-3 text-red-500">
					No Record Found
				</div>
			)}
			{loading &&
				Array(4)
					.fill(null)
					.map((_, index) => (
						<Skeleton key={index} className="aspect-square" />
					))}
			{!loading &&
				data.map((testimonial) => (
					<div key={testimonial.id}>
						<div className="relative flex justify-center min-h-[100px]">
							{testimonial.image && (
								<NextImage
									src={testimonial.image}
									alt={testimonial.alt || ""}
									className="aspect-square max-w-[100px]"
								/>
							)}
							{testimonial.video_url && (
								<iframe width="320" height="240">
									src={testimonial.video_url}
								</iframe>
							)}
							<Button
								size="icon"
								className="w-8 h-8 absolute bottom-0 right-10"
								onClick={() => dispatch(setSelectedTestimonial(testimonial))}
							>
								<MdEdit />
							</Button>

							<div className="absolute bottom-0 right-0">
								<DeleteDrawer
									title={`Delete Testimonial from ${testimonial.name}`}
									description={`Are you sure you want to delete this Testimonial? This action cannot be undone.`}
									onDelete={() => deleteTestimonial(testimonial.id, testimonial.image)}
								/>
							</div>
						</div>
						<div className="mt-4">
							<div>
								<span className="font-bold">Name: </span> {testimonial?.name}
							</div>
							<div>
								<span className="font-bold">Designation{" "}</span>
								{testimonial.designation}
							</div>
						</div>
						<div className="mt-4">
							<span className="font-bold">Testimonial </span>{" "}
							{parse(testimonial?.testimonial)}
						</div>
					</div>
				))}
		</div>
	);
}
