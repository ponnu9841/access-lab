import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks/use-selector";
import ContactTable from "./contact-table-accordion";

export default function Contact() {
	const { data, loading } = useAppSelector(
		(state) => state.rootReducer.contact
	);

	return (
		<div>
			{loading &&
				Array(6)
					.fill(null)
					.map((_, index) => <Skeleton key={index} className="h-6 w-full" />)}
			{!loading && data === null && (
				<div className="col-span-4 text-center mt-3 text-red-500">
					No Record Found
				</div>
			)}
			{!loading && data !== null && data.map((contact) => (
				<div className="relative p-3" key={contact.id}>
					<ContactTable contact={contact} />
				</div>
			)

			)}
		</div>
	);
}
