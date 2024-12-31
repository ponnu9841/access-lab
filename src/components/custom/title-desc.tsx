import { cn } from "@/lib/utils";

const TitleDescription = ({
	desc,
	className,
}: {
	desc: string;
	className?: string;
}) => (
	<p
		className={cn(
			"text-muted-foreground font-semibold text-lg mt-3",
			className
		)}
	>
		{desc}
	</p>
);

export default TitleDescription;
