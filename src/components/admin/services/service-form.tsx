import axiosClient from "@/axios/axios-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/text-editor";
import { fetchService } from "@/redux/features/service-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { ServiceFormData, serviceSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import FormAction from "../form-action";

export default function ServicesForm() {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ServiceFormData>({
		resolver: zodResolver(serviceSchema),
	});

	const dispatch = useAppDispatch();
	const [images, setImages] = useState<ExtendedFile[]>([]);
	const { loading, selectedService } = useAppSelector(
		(state) => state.rootReducer.service
	);

	const onSubmit = (data: ServiceFormData) => {
		const form = new FormData();
		form.append("title", data.title);
		form.append("shortDescription", data.shortDescription);
		form.append("longDescription", data.longDescription);
		if (images.length > 0) {
			form.append("image", images[0]);
		}
		if (data.imageAlt) {
			form.append("alt", data.imageAlt);
		}
		axiosClient
			.post("/service", form)
			.then((response) => {
				if (response.status === 200) {
					dispatch(fetchService());
					reset();
					setImages([]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		console.log(selectedService);
		if (selectedService) {
			reset({
				title: selectedService.title,
				shortDescription: selectedService.short_description,
				longDescription: selectedService.long_description,
				imageAlt: selectedService.alt || "", // Assuming you have this field
			});
			(async () => {
				const fileUrl = selectedService.image; // Replace with your URL
				const filename = "service-image.png";
				const file = new File([fileUrl], filename, { type: "image/png" }) as ExtendedFile;
				file.url = fileUrl;
				setImages([file]);

				
			})();
		}
	}, [selectedService]); //eslint-disable-line

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-4">
				<Label htmlFor="title">Title</Label>
				<Input
					{...register("title")}
					type="text"
					name="title"
					id="title"
					className={errors.title ? "border-red-500" : ""}
					aria-invalid={errors.title ? "true" : "false"}
					aria-describedby={errors.title ? "service-name-error" : undefined}
					placeholder="Service Name"
				/>
				<RenderError error={errors.title?.message} />
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
				<Label htmlFor="shortDescription">Short Description</Label>
				<Controller
					name="shortDescription"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextEditor value={value} setValue={onChange} />
					)}
				/>
				<RenderError error={errors.shortDescription?.message} />
			</div>
			<div className="mt-4">
				<Label htmlFor="longDescription">Short Description</Label>
				<Controller
					name="longDescription"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextEditor value={value} setValue={onChange} />
					)}
				/>
				<RenderError error={errors.longDescription?.message} />
			</div>
			<FormAction reset={reset} loading={loading} setImages={setImages} />
		</form>
	);
}
