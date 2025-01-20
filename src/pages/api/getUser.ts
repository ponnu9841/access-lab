import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/services/auth";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const decodedUser = await isAuthenticated(req, res);
			if (decodedUser) {
				res.status(200).json(decodedUser);
				return;
			}
            res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
		} catch (error) {
			res.status(500).json({ error, message: "Something went wrong." });
		}
	}
}
