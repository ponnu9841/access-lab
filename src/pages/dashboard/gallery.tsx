import GalleryForm from "@/components/admin/gallery/form";
import Gallery from "@/components/admin/gallery/gallery";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function GalleryPage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<GalleryForm />
			</div>
			<div>
				{/* show uploaded images */}
				<Gallery />
			</div>
		</div>
	);
}

GalleryPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashBoardLayout>{page}</DashBoardLayout>;
};
