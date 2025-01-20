import jwt from "jsonwebtoken";

export function generateAccessToken(user: UserAlt) {
	const jwtAccessKey = process.env.JWT_ACCESS_SECRET;
	if (!jwtAccessKey) {
		throw new Error("JWT_ACCESS_SECRET environment variable is not set");
	}
	return jwt.sign({ user }, jwtAccessKey, {
		expiresIn: "30m",
	});
}

// Generate a random string as refreshToken
// function generateRefreshToken() {
// 	const token = crypto.randomBytes(16).toString("base64url");
// 	return token;
// }

export function 
generateTokens(user: UserAlt) {
	const accessToken = generateAccessToken(user);
	// const refreshToken = generateRefreshToken();
	return { accessToken };
}
