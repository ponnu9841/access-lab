import axiosClient from "@/axios/axios-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchBanner } from "@/redux/features/banner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { BannerFormData, bannerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function BannerForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BannerFormData>({
		resolver: zodResolver(bannerSchema),
	});

	const dispatch = useAppDispatch();
	const { loading, data } = useAppSelector((state) => state.rootReducer.banner);

	const onSubmit = (data: BannerFormData) => {
		const form = new FormData();
		form.append("title", data.title);
		form.append("description", data.description);
		if (data.image && data.image) {
			form.append("image", data.image[0]);
		}
		axiosClient
			.post("/banner", form)
			.then((response) => {
				if(response.status === 200){
					dispatch(fetchBanner());
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const controller = new AbortController();
		dispatch(fetchBanner(controller));
		return () => controller.abort();
	}, []); //eslint-disable-line

	return (
		<div>
			{data.length < 3 ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<Label htmlFor="image">Image</Label>
						<Input
							{...register("image")}
							type="file"
							name="image"
							id="image"
							accept="image/*"
							className={errors.image ? "border-red-500" : ""}
							aria-invalid={errors.image ? "true" : "false"}
							aria-describedby={errors.image ? "image-error" : undefined}
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="title">Title</Label>
						<Input
							{...register("title")}
							type="text"
							name="title"
							id="title"
							className={errors.image ? "border-red-500" : ""}
							aria-invalid={errors.image ? "true" : "false"}
							aria-describedby={errors.image ? "title-error" : undefined}
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="title">Description</Label>
						<Input
							{...register("description")}
							type="text"
							name="description"
							id="description"
							className={errors.image ? "border-red-500" : ""}
							aria-invalid={errors.image ? "true" : "false"}
							aria-describedby={errors.image ? "description-error" : undefined}
						/>
					</div>

					<Button type="submit" disabled={loading} className="mt-4">
						{loading ? "Submitting..." : "Submit"}
					</Button>
				</form>
			) : (
				<div className="text-center text-2xl">
					Max. no of banner added. Delete one to add
				</div>
			)}
		</div>
	);
}
