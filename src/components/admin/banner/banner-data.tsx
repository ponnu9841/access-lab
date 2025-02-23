import NextImage from "@/components/Image";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { DeleteDrawer } from "@/components/admin/delete-drawer";
import axiosClient from "@/axios/axios-client";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { fetchBanner } from "@/redux/features/banner-slice";

export default function BannerData() {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.rootReducer.banner);

	const deleteBanner = async (id: string, image: string) => {
		try {
			const response = await axiosClient.delete(`/banner`, {
				params: { id, image },
			});
			if (response.status === 200) {
				dispatch(fetchBanner());
			}
		} catch (error) {
			console.error("Error deleting banner:", error);
			throw error; // Re-throw the error to handle it elsewhere if needed
		}
	};

	return (
		<div className="flex items-start gap-6">
			{data.length > 0
				? data.map((banner, index) => (
						<div key={index} className="max-w-[200px]">
							<div className="relative mb-3">
								<NextImage
									src={banner.image}
									className="aspect-square max-w-[200px]"
								/>
								<div className="absolute bottom-0 right-0">
									<DeleteDrawer
										title={`Delete ${banner.title}`}
										description={`Are you sure you want to delete ${banner.title}? This action cannot be undone.`}
										onDelete={() => deleteBanner(banner.id, banner.image)}
									/>
								</div>
								{/* <div className="absolute top-3 right-16">edit</div> */}
							</div>

							<div>
								<span className="font-bold">Title:&nbsp;</span>
								{banner.title}
							</div>
							<div className="mt-3 max-h-[100px] overflow-auto">
								<span className="font-bold">Description:&nbsp;</span>
								{banner.description}
							</div>
						</div>
				  ))
				: "Banner not Added"}
		</div>
	);
}
