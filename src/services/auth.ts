import { NextApiRequest, NextApiResponse } from "next";

export function isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
        return;
	}
}
