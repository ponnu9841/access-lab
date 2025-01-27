import TestimonialForm from "@/components/admin/testimonial/form";
import Testimonials from "@/components/admin/testimonial/testimonial";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchTestimonial } from "@/redux/features/testimonial-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import React, { useEffect } from "react";

export default function TestimonialsPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchTestimonial(controller));
		// dispatch partner
		return () => controller.abort();
	}, []);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<TestimonialForm />
			</div>
			<div>
				<Testimonials />
			</div>
		</div>
	);
}

TestimonialsPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashBoardLayout>{page}</DashBoardLayout>;
};
