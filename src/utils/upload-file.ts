import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";
export const createDirectory = (dir: string) => {
	const dirPath = path.join(process.cwd(), "public", "uploads", dir);
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
};

export const uploadFile = async (filePath: string, fileLocation: string, ) => {
	const rawData = fs.readFileSync(filePath);
	await writeFile(fileLocation, rawData);
};

export const deleteFile = async (filePath: string) => {
	fs.unlinkSync(filePath);
};
