import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function Gallery() {
    return (
        <div>Dashboard</div>
    )
}

Gallery.getLayout = function getLayout(page: React.ReactElement) {
    return <DashBoardLayout>{page}</DashBoardLayout>;
};
