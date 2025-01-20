import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export async function isAuthenticated(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authorization } = req.headers;
	const token = authorization?.split(" ")[1];

	if (!authorization) {
		res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
		res.redirect("/login");
		return;
	}
	try {
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_ACCESS_SECRET as string
		);
		return decoded;
	} catch (error) {
		res.status(401).json({ message: "Invalid token", error });
		res.redirect("/login");
	}
}
