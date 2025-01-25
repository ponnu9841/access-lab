import { Button } from "@/components/ui/button";
import React from "react";

export default function FormAction({
	loading,
	reset,
	setImages,
}: {
	loading: boolean;
	reset: () => void;
	setImages?: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
}) {
	const resetForm = () => {
		reset();
		if (setImages) setImages([]);
	};
	return (
		<div className="flex space-x-4 my-4">
			<Button type="button" variant="destructive" onClick={resetForm}>
				Reset
			</Button>
			<Button type="submit" disabled={loading}>
				{loading ? "Saving" : "Save"}
			</Button>
		</div>
	);
}
