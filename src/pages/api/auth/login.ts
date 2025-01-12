// import type { NextApiRequest, NextApiResponse } from "next";
// import { findUserByEmail } from "@/services/user";
// import bcrypt from "bcrypt";
// import { generateTokens } from "@/utils/jwt";
// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		const { email, password } = req.body;
// 		if (!email || !password) {
// 			res
// 				.status(400)
// 				.json({ message: "You must provide an email and a password." });
// 		}
// 		const existingUser = await findUserByEmail(email);
// 		if (!existingUser) {
// 			res.status(403).json({ message: "Invalid credentials." });
// 			return;
// 		}
// 		const validPassword = await bcrypt.compare(password, existingUser.password);
// 		if (!validPassword) {
// 			res.status(403).json({ message: "Invalid credentials." });
// 			return;
// 		}
// 		const user = {
// 			name: existingUser.name,
// 			email: existingUser.email,
// 		};

// 		const { accessToken } = generateTokens(existingUser);
// 		res.status(200).json({ user, accessToken });

// 		res.status(200).json({ success: true });
// 	} catch (error) {
// 		res.status(500).json({ error, message: "Something went wrong." });
// 	}
// }
