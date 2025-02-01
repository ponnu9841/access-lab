import Contact from "@/components/admin/contact/contact";
import ContactForm from "@/components/admin/contact/form";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function ContactPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchContact(controller));
		// dispatch partner
		return () => controller.abort();
	}, []);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<ContactForm />
			</div>
			<div>
				<Contact />
			</div>
		</div>
	);
}

ContactPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashBoardLayout>{page}</DashBoardLayout>;
};
