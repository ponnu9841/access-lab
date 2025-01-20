import Banner from "@/components/admin/banner";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function Dashboard() {
	return (
		<div>
			<h2 className="text-lg">Banner</h2>
			<Banner />
		</div>
	);
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
	return <DashBoardLayout>{page}</DashBoardLayout>;
};
