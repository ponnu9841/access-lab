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

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const bannerSchema = z.object({
	image: z.custom<File[] | null>(
		(val) => {
			if (val === null)
				return {
					valid: false,
					issues: [
						{
							code: z.ZodIssueCode.invalid_type,
							message: "Input must be a file",
						},
					],
				};
			if (val instanceof File) return { valid: true, issues: [] };
			return {
				valid: false,
				issues: [
					{
						code: z.ZodIssueCode.invalid_type,
						message: "Input must be a file",
					},
				],
			};
		},
	),
  title: z.string(),
  description: z.string(),
});

export type BannerFormData = z.infer<typeof bannerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
