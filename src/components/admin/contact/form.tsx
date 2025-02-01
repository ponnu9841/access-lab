import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { ContactFormData, contactSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { useAppSelector } from "@/redux/hooks/use-selector";

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const [loading, setLoading] = useState(false);

	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.rootReducer.contact);

	const onSubmit = (data: ContactFormData) => {
		if (data.id) {
			axiosClient
				.put("/contact", data)
				.then((response) => {
					if (response.status === 200) {
						reset();
						dispatch(fetchContact());
					}
				})
				.finally(() => setLoading(false));
		} else {
			axiosClient
				.post("/contact", data)
				.then((response) => {
					if (response.status === 200) {
						reset();
						dispatch(fetchContact());
					}
				})
				.finally(() => setLoading(false));
		}
	};

	useEffect(() => {
		if (data) {
			reset({
				id: data.id,
				location: data.location,
				contactOne: data.contactno_one,
				contactTwo: data.contactno_two || undefined,
				emailOne: data.email_one,
				emailTwo: data.email_two || undefined,
			});
		}
	}, [data]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="hidden" {...register("id")} />
			<div className="my-4">
				<Label htmlFor="location">Location</Label>
				<Textarea
					{...register("location")}
					name="location"
					id="location"
					placeholder="Add Location"
					className={errors.location ? "border-red-500" : ""}
					aria-invalid={errors.location ? "true" : "false"}
					aria-describedby={errors.location ? "image-error" : undefined}
				/>
				<RenderError error={errors.location?.message} />
			</div>
			<div className="my-4">
				<Label htmlFor="contactOne">Contact Number</Label>
				<Input
					{...register("contactOne")}
					type="text"
					name="contactOne"
					id="contactOne"
					placeholder="Contact Number"
					className={errors.contactOne ? "border-red-500" : ""}
					aria-invalid={errors.contactOne ? "true" : "false"}
					aria-describedby={errors.contactOne ? "image-error" : undefined}
				/>
				<RenderError error={errors.contactOne?.message} />
			</div>
			<div className="my-4">
				<Label htmlFor="contactTwo">Alternate Contact Number</Label>
				<Input
					{...register("contactTwo")}
					type="text"
					name="contactTwo"
					id="contactTwo"
					placeholder="Contact Number"
					className={errors.contactTwo ? "border-red-500" : ""}
					aria-invalid={errors.contactTwo ? "true" : "false"}
					aria-describedby={errors.contactTwo ? "image-error" : undefined}
				/>
				<RenderError error={errors.contactTwo?.message} />
			</div>
			<div className="my-4">
				<Label htmlFor="emailOne">Email</Label>
				<Input
					{...register("emailOne")}
					type="text"
					name="emailOne"
					id="emailOne"
					placeholder="Email"
					className={errors.emailOne ? "border-red-500" : ""}
					aria-invalid={errors.emailOne ? "true" : "false"}
					aria-describedby={errors.emailOne ? "image-error" : undefined}
				/>
				<RenderError error={errors.emailOne?.message} />
			</div>
			<div className="my-4">
				<Label htmlFor="emailTwo">Alternate Email</Label>
				<Input
					{...register("emailTwo")}
					type="text"
					name="emailTwo"
					id="emailTwo"
					placeholder="Email"
					className={errors.emailTwo ? "border-red-500" : ""}
					aria-invalid={errors.emailTwo ? "true" : "false"}
					aria-describedby={errors.emailTwo ? "image-error" : undefined}
				/>
				<RenderError error={errors.emailTwo?.message} />
			</div>
			<FormAction loading={loading} reset={reset} />
		</form>
	);
}
