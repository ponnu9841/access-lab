import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/services/auth";
import { db, disconnectDb } from "@/utils/db";
import { createDirectory, deleteFile, uploadFile } from "@/utils/upload-file";
import { parseForm } from "@/services/parseForm";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const partnerData = await db.partner.findMany({
				select: {
					id: true,
					image: true,
					alt: true,
				},
                orderBy: {
                    created_at: "desc"
                }
			});
			res.status(200).json({ data: partnerData });
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		} finally {
			disconnectDb();
		}
	}
	if (req.method === "POST") {
		const decodedUser = await isAuthenticated(req, res);
		if (!decodedUser) return;
		try {
			const { fields, files } = await parseForm(req);
			const image = files.image?.[0];
			const alt = fields.alt?.[0];
			if (image) {
				const filePath = `/uploads/partner/${image.newFilename}-${Date.now()}-${
					image.originalFilename
				}`;
				const fileLocation = `./public/${filePath}`;
				createDirectory("partner");
				uploadFile(image.filepath, fileLocation);
				// const rawData = fs.readFileSync(image.filepath);
				// await writeFile(fileLocation, rawData);

				try {
					const partner = await db.partner.create({
						data: {
							image: filePath,
							alt: alt ?? "",
						},
					});
					res.status(200).json(partner);
				} catch (error) {
					res.status(500).json({ error, message: "Something went wrong." });
				} finally {
					disconnectDb();
				}
			}
			res.status(400).json({ message: "Image not found." });
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		}
	}
	if (req.method === "DELETE") {
		const decodedUser = await isAuthenticated(req, res);
		if (!decodedUser) return;
		try {
			const { id, image } = req.query;

			if (!id) {
				return res.status(400).json({ message: "Missing Partner ID." });
			}

			// Delete the record from the database
			const deletedPartner = await db.partner.delete({
				where: { id: String(id) },
			});

			// Optionally, remove the associated image file
			if (image) {
				const filePath = `./public${image}`;
				deleteFile(filePath);
			}

			res
				.status(200)
				.json({ message: "Banner deleted successfully.", data: deletedPartner });

		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		} finally {
			disconnectDb();
		}
	}
}
