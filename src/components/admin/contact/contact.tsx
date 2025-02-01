import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks/use-selector";

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
			{!loading && data !== null && (
				<div className="relative p-3">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="font-bold w-[120px]">Location</TableCell>
								<TableCell className="font-medium whitespace-pre">
									{data.location}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-bold w-[180px]">
									Contact Number
								</TableCell>
								<TableCell className="font-medium whitespace-pre">
									{data.contactno_one}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-bold w-[120px]">
									Contact Number(Alt)
								</TableCell>
								<TableCell className="font-medium whitespace-pre">
									{data.contactno_two}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-bold w-[120px]">Email</TableCell>
								<TableCell className="font-medium whitespace-pre">
									{data.email_one}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-bold w-[120px]">
									Email(Alt)
								</TableCell>
								<TableCell className="font-medium whitespace-pre">
									{data.email_two}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
