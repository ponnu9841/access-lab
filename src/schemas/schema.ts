import { z } from "zod";

// Document Schema
// export const DOCUMENT_SCHEMA = z
//   .instanceof(File)
//   .refine(
//     (file) =>
//       [
//         "application/pdf",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ].includes(file.type),
//     { message: "Invalid document file type" }
//   );

const fileValidation = (val: unknown) => {
	if (val === null) {
		return {
			valid: false,
			issues: [
				{
					code: z.ZodIssueCode.invalid_type,
					message: "Input must be a file",
				},
			],
		};
	}
	if (val instanceof File) {
		return { valid: true, issues: [] };
	}
	return {
		valid: false,
		issues: [
			{
				code: z.ZodIssueCode.invalid_type,
				message: "Input must be a file",
			},
		],
	};
};

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const bannerSchema = z.object({
	image: z.custom<File[] | null>(fileValidation),
	title: z.string(),
	description: z.string(),
});

export const partnerSchema = z.object({
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string(),
});

export const serviceSchema = z.object({
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	shortDescription: z.string().min(3, "Title must be at least 3 characters"),
	longDescription: z.string().min(3, "Title must be at least 3 characters"),
});

export const testimonialsSchema = z.object({
	// image: z.custom<File[] | null>(fileValidation),
	videoUrl: z.string().optional(),
	imageAlt: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	designation: z.string().min(3, "Designation must be at least 3 characters"),
	testimonial: z.string().min(3, "Testimonial must be at least 3 characters"),
});

export const gallerySchema = z.object({
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
});

export const teamsSchema = z.object({
	imageAlt: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	designation: z.string().optional(),
	lindedInProfile: z.string().optional(),
})

export type TeamsFormData = z.infer<typeof teamsSchema>;

export type GalleryFormData = z.infer<typeof gallerySchema>;

export type TestimonialsFormData = z.infer<typeof testimonialsSchema>;

export type ServiceFormData = z.infer<typeof serviceSchema>;

export type PartnerFormData = z.infer<typeof partnerSchema>;

export type BannerFormData = z.infer<typeof bannerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
