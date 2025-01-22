import axiosClient from "@/axios/axios-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPartner } from "@/redux/features/partner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { PartnerFormData, partnerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function PartnerForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PartnerFormData>({
		resolver: zodResolver(partnerSchema),
	});

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(
		(state) => state.rootReducer.partner
	);

	const onSubmit = (data: PartnerFormData) => {
		const formData = new FormData();
		if (data.image && data.image) {
			formData.append("image", data.image[0]);
		}
    formData.append("alt", data.imageAlt);
		axiosClient
			.post("/partner", formData)
			.then((response) => {
				if (response.status === 200) {
					reset();
					dispatch(fetchPartner());
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
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
			<div className="my-4">
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
			<Button type="submit" disabled={loading}>
				{loading ? "Saving" : "Save"}
			</Button>
		</form>
	);
}
