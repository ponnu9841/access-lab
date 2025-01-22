import { IncomingForm, Fields, Files } from "formidable";
import { NextApiRequest } from "next";

interface ParsedForm {
	fields: Fields;
	files: Files;
}

export const parseForm = (req: NextApiRequest): Promise<ParsedForm> =>
	new Promise((resolve, reject) => {
		const form = new IncomingForm();
		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});
