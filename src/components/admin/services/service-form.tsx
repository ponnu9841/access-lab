import axiosClient from "@/axios/axios-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/text-editor";
import { fetchService } from "@/redux/features/service-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { ServiceFormData, serviceSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import parse from "html-react-parser";

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
	const { loading, selectedService } = useAppSelector((state) => state.rootReducer.service);

	const onSubmit = (data: ServiceFormData) => {
		const form = new FormData();
		form.append("title", data.title);
		form.append("shortDescription", data.shortDescription);
		form.append("longDescription", data.longDescription);
		if (data.image) {
			form.append("image", data.image[0]);
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
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (selectedService) {
            reset({
              title: selectedService.title,
              shortDescription: String(parse(selectedService.short_description)),
              longDescription: String(parse(selectedService.long_description)),
              image: null, // Handle image separately if needed
              imageAlt: selectedService.alt || "", // Assuming you have this field
            });
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
			</div>
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
			<div className="mt-4">
				<Label htmlFor="shortDescription">Short Description</Label>
				<Controller
					name="shortDescription"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextEditor
							value={value}
							setValue={onChange}
						/>
					)}
				/>
			</div>
			<div className="mt-4">
				<Label htmlFor="longDescription">Short Description</Label>
				<Controller
					name="longDescription"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextEditor
							value={value}
							setValue={onChange}
						/>
					)}
				/>
			</div>
			<Button type="submit" disabled={loading} className="mt-4">
				{loading ? "Saving" : "Save"}
			</Button>
		</form>
	);
}
