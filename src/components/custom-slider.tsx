import React from "react";
import { Slider } from "@/components/ui/slider";

interface CustomSliderProps {
	title: string;
	value: number;
	onChange?: (value: number[]) => void;
	min?: number;
	max?: number;
	step?: number;
	backgroundColor?: string;
}

export default function CustomSlider({
	title,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	backgroundColor = "bg-primary",
}: CustomSliderProps) {
	return (
		<div className="w-full max-w-sm space-y-4">
			<div className="flex justify-between items-center">
				<div className="text-base font-medium leading-none">{title}</div>
				<span className="text-sm text-muted-foreground">{value}%</span>
			</div>
			<Slider
				min={min}
				max={max}
				step={step}
				value={[value]}
				onValueChange={onChange}
				className={`rounded-md`}
                rangeClassName={`${backgroundColor}`}
                disabled
			/>
		</div>
	);
}
