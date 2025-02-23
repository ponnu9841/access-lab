import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import React from "react";

export type TextEditorProps = {
	value: string | undefined;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
};

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false], paragraph: [true, false] }],
		["bold", "italic", "underline", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
];

export default function TextEditor(props: TextEditorProps) {
	const { value, setValue, placeholder = "" } = props;

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={(e) => setValue(e)}
			modules={modules}
			formats={formats}
			className="rounded"
			placeholder={placeholder}
		/>
	);
}
