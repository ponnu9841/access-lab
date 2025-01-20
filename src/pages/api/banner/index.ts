import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/services/auth";
import { db, disconnectDb } from "@/utils/db";
import { IncomingForm, Files, Fields } from "formidable";
import { createDirectory, deleteFile, uploadFile } from "@/utils/upload-file";

export const config = {
	api: {
		bodyParser: false,
	},
};

interface ParsedForm {
	fields: Fields;
	files: Files;
}

const parseForm = (req: NextApiRequest): Promise<ParsedForm> =>
	new Promise((resolve, reject) => {
		const form = new IncomingForm();
		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const decodedUser = await isAuthenticated(req, res);
			if (decodedUser) {
				const bannerData = await db.banner.findMany({
					select: {
						id: true,
						title: true,
						description: true,
						image: true,
					},
				});
				res.status(200).json({ data: bannerData });
				return;
			}
			res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		} finally {
			disconnectDb();
		}
	}
	if (req.method === "POST") {
		try {
			const decodedUser = await isAuthenticated(req, res);
			if (decodedUser) {
				const { fields, files } = await parseForm(req);
				const image = files.image?.[0];
				const title = fields.title?.[0];
				const description = fields.description?.[0];
				if (image && title && description) {
					const filePath = `/uploads/banner/${image.newFilename}-${Date.now()}-${image.originalFilename}`;
					const fileLocation = `./public/${filePath}`;
					createDirectory("banner");
					uploadFile(image.filepath, fileLocation);
					// const rawData = fs.readFileSync(image.filepath);
					// await writeFile(fileLocation, rawData);
					try {
						const banner = await db.banner.create({
							data: {
								title,
								description,
								image: filePath,
							},
						});
						res.status(200).json(banner);
					} catch (error) {
						res.status(500).json({ error, message: "Something went wrong." });
					} finally {
						disconnectDb();
					}
				}
			}
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		}
	}
	if (req.method === "DELETE") {
		try {
			const decodedUser = await isAuthenticated(req, res);
			if (!decodedUser) return;

			const { id, image } = req.query;

			if (!id) {
				return res.status(400).json({ message: "Missing banner ID." });
			}

			// Delete the record from the database
			const deletedBanner = await db.banner.delete({
				where: { id: String(id) },
			});

			// Optionally, remove the associated image file
			if (image) {
				const filePath = `./public${image}`;
				deleteFile(filePath);
			}

			res
				.status(200)
				.json({ message: "Banner deleted successfully.", data: deletedBanner });

			res.status(200).json({ message: "Banner deleted successfully." });
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		} finally {
			disconnectDb();
		}
	}
}
