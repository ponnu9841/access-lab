import TeamsForm from "@/components/admin/teams/form";
import Teams from "@/components/admin/teams/teams";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchTeams } from "@/redux/features/teams-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function TeamsPage() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchTeams(controller));
		// dispatch partner
		return () => controller.abort();
	}, []);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<TeamsForm />
			</div>
			<div>
				<Teams />
			</div>
		</div>
	);
}

TeamsPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashBoardLayout>{page}</DashBoardLayout>;
};
