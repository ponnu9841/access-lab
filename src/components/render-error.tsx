import React from "react";

export default function RenderError({ error }: { error?: string }) {
	return <div className="leading-0 text-red-500 flex justify-start items-center my-1">{!!error && error}</div>;
}
