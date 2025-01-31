import axiosClient from "@/axios/axios-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { TeamsFormData, teamsSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import FormAction from "../form-action";
import { useForm } from "react-hook-form";
import { fetchTeams } from "@/redux/features/teams-slice";

export default function TeamsForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TeamsFormData>({
		resolver: zodResolver(teamsSchema),
	});

	const dispatch = useAppDispatch();
	const [images, setImages] = useState<ExtendedFile[]>([]);
	const [loading, setLoading] = useState(false);
	const { selectedData } = useAppSelector((state) => state.rootReducer.teams);

	const onSubmit = (data: TeamsFormData) => {
		const form = new FormData();
		form.append("name", data.name);
		form.append("designation", data.designation || "");
		form.append("alt", data.imageAlt || "");
		if (images.length > 0) {
			form.append("image", images[0]);
		}
		axiosClient
			.post("/teams", form)
			.then((response) => {
				if (response.status === 200) {
					dispatch(fetchTeams());
					reset();
					setImages([]);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		console.log(selectedData);
		if (selectedData) {
			reset({
				name: selectedData.name,
				imageAlt: selectedData.alt || "",
				designation: selectedData.designation || "",
				lindedInProfile: selectedData.lindedInProfile || "", // Assuming you have this field
			});
			(async () => {
				const fileUrl = selectedData.image; // Replace with your URL
				const filename = "service-image.png";
				const file = new File([fileUrl], filename, {
					type: "image/png",
				}) as ExtendedFile;
				file.url = fileUrl;
				setImages([file]);
			})();
		}
	}, [selectedData]); //eslint-disable-line

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-4">
				<Label htmlFor="name">Name</Label>
				<Input
					{...register("name")}
					type="text"
					name="name"
					id="name"
					className={errors.name ? "border-red-500" : ""}
					aria-invalid={errors.name ? "true" : "false"}
					aria-describedby={errors.name ? "service-name-error" : undefined}
					placeholder="Team Member Name"
				/>
				<RenderError error={errors.name?.message} />
			</div>
			<div className="mt-4">
				<ImageUpload images={images} setImages={setImages} />
			</div>
			{images.length > 0 && (
				<div className="mt-0">
					<Label htmlFor="imageAlt">Image Alt</Label>
					<Input
						{...register("imageAlt")}
						type="text"
						name="imageAlt"
						id="imageAlt"
						placeholder="Image alt"
						className={errors.imageAlt ? "border-red-500" : ""}
						aria-invalid={errors.imageAlt ? "true" : "false"}
						aria-describedby={errors.imageAlt ? "image-error" : undefined}
					/>
				</div>
			)}
			<div className="mt-4">
				<Label htmlFor="designation">Designation</Label>
				<Input
					{...register("designation")}
					type="text"
					name="designation"
					id="designation"
					placeholder="Designation"
					className={errors.designation ? "border-red-500" : ""}
					aria-invalid={errors.designation ? "true" : "false"}
					aria-describedby={errors.designation ? "image-error" : undefined}
				/>
				<RenderError error={errors.designation?.message} />
			</div>
			<div className="mt-4">
				<Label htmlFor="lindedInProfile">LinkedIn Profile</Label>
				<Input
					{...register("lindedInProfile")}
					type="text"
					name="lindedInProfile"
					id="lindedInProfile"
					placeholder="Linked In Profile Url"
					className={errors.lindedInProfile ? "border-red-500" : ""}
					aria-invalid={errors.lindedInProfile ? "true" : "false"}
					aria-describedby={errors.lindedInProfile ? "image-error" : undefined}
				/>
				<RenderError error={errors.lindedInProfile?.message} />
			</div>
			<FormAction reset={reset} loading={loading} setImages={setImages} />
		</form>
	);
}
