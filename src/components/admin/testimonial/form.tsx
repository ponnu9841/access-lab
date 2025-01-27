import axiosClient from "@/axios/axios-client";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import TextEditor from "@/components/ui/text-editor";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { TestimonialsFormData, testimonialsSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormAction from "../form-action";
import { fetchTestimonial } from "@/redux/features/testimonial-slice";

export default function TestimonialsForm() {
	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm<TestimonialsFormData>({
		resolver: zodResolver(testimonialsSchema),
	});

	const [testimonialType, setTestimonialType] = useState("");
	const [selectTypeError, setSelectTypeError] = useState(false);
	const [images, setImages] = useState<ExtendedFile[]>([]);
	const [loading, setLoading] = useState(false);

	const dispatch = useAppDispatch();

	const onSubmit = (data: TestimonialsFormData) => {
		if (!testimonialType) {
			setSelectTypeError(true);
			return;
		}
		const formData = new FormData();
		formData.append("url", data.videoUrl || "");
		if (images.length > 0) {
			formData.append("image", images[0]);
		}
		formData.append("alt", data.imageAlt || "");
		formData.append("name", data.name);
		formData.append("designation", data.designation);
		formData.append("testimonial", data.testimonial);

		setLoading(true);
		setSelectTypeError(false);
		axiosClient
			.post("/testimonial", formData)
			.then((response) => {
				if (response.status === 200) {
					reset();
					setImages([]);
					setTestimonialType("");
					dispatch(fetchTestimonial());
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	};

	const handleSelectChange = (value: string) => {
		setTestimonialType(value);
		setSelectTypeError(false);
		if (value === "url") {
			setImages([]);
			setValue("imageAlt", "");
		}
		if (value === "image") {
			setValue("videoUrl", "");
		}
	};

	const resetForm = () => {
		reset();
		setImages([]);
		setTestimonialType("");
	};

	return (
		<>
			<Select value={testimonialType} onValueChange={handleSelectChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select Testimonial Type" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="url">Video</SelectItem>
					<SelectItem value="image">Image</SelectItem>
				</SelectContent>
			</Select>
			<RenderError error={selectTypeError ? "Select Testimonial Type" : ""} />

			<form onSubmit={handleSubmit(onSubmit)}>
				{testimonialType === "url" && (
					<div className="mt-4">
						<Input
							type="url"
							placeholder="Video URL"
							{...register("videoUrl")}
						/>
					</div>
				)}
				{testimonialType === "image" && (
					<>
						<div className="mt-4">
							<ImageUpload images={images} setImages={setImages} />
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
					</>
				)}

				<div className="mt-4">
					<Label htmlFor="name">Name</Label>
					<Input
						{...register("name")}
						type="text"
						name="name"
						id="name"
						className={errors.name ? "border-red-500" : ""}
						aria-invalid={errors.name ? "true" : "false"}
						aria-describedby={errors.name ? "image-error" : undefined}
					/>
					<RenderError error={errors.name?.message} />
				</div>

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
					<Label htmlFor="testimonial">Testimonial</Label>
					<Controller
						name="testimonial"
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextEditor
								value={value}
								setValue={onChange}
								placeholder="Enter Testimonial"
							/>
						)}
					/>
					<RenderError error={errors.testimonial?.message} />
				</div>
				<FormAction loading={loading} reset={resetForm} setImages={setImages} />
			</form>
		</>
	);
}
