import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import React from "react";

export type TextEditorProps = {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  height?: number;
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
  const { value, setValue, placeholder = "", height } = props;
  const h = height ? `min-h-[${height}px]` : "min-h-[130px]";

  return (
    <div className={cn(`relative h-full w-full h-[200px] max-h-[600px] overflow-auto`, h)}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(e) => setValue(e)}
          modules={modules}
          formats={formats}
          className="rounded h-full flex flex-col"
          placeholder={placeholder}
        />
    </div>
  );
}
