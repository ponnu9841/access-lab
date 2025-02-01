import NextImage from "@/components/Image";
import { fetchGallery, setPageNo } from "@/redux/features/gallery-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { useEffect } from "react";
import { DeleteDrawer } from "../delete-drawer";
import axiosClient from "@/axios/axios-client";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function Gallery() {
	const dispatch = useAppDispatch();
	const { loading, pageNo, gallery } = useAppSelector(
		(state) => state.rootReducer.gallery
	);

	const lastPage = gallery?.last_page;

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchGallery({ controller, pageNo }));
		// dispatch partner
		return () => controller.abort();
	}, [pageNo]); //eslint-disable-line

	const deleteGallery = async (id: string, image: string) => {
		try {
			const response = await axiosClient.delete(`/gallery`, {
				params: { id, image },
			});
			if (response && response.status === 200) {
				dispatch(fetchGallery({ pageNo }));
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<div>
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-auto">
				{loading &&
					Array(6)
						.fill(null)
						.map((_, index) => (
							<Skeleton key={index} className="aspect-square" />
						))}
				{!loading && gallery?.data.length === 0 && (
					<div className="col-span-4 text-center mt-3 text-red-500">
						No Record Found
					</div>
				)}
				{!loading &&
					gallery?.data.map((image: Gallery) => (
						<div key={image.id}>
							<div className="relative">
								<NextImage className="aspect-square" src={image.image} />
								<div className="absolute bottom-0 right-0">
									<DeleteDrawer
										title={`Delete Gallery Image ${image.title}`}
										description={`Are you sure you want to delete this image? This action cannot be undone.`}
										onDelete={() => deleteGallery(image.id, image.image)}
									/>
								</div>
							</div>
							<div className="mt-3">
								<b>Title </b> {image.title}
							</div>
							<div className="mt-3">
								<b>Description </b> {image.description}
							</div>
						</div>
					))}
			</div>
			{!loading && gallery?.data.length ? (
				<div className="mt-6">
					<Pagination
						pageNo={pageNo}
						setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
						totalPages={lastPage || 1}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
