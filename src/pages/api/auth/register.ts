import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { db } from "@/utils/db";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 11);
		if (!email || !password || !name) {
			res
				.status(400)
				.json({ message: "You must provide name, email and a password." });
			return;
		}

		const createdUser = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
        const user = Object.fromEntries(
            Object.entries(createdUser).filter(([key]) => key !== "password")
          );
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error, message: "Something went wrong." });
	}
}
