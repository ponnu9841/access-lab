import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@/interfaces/common";

export default function RenderAvatar(props: AvatarProps) {
	const {
		name,
		image,
		avatarClassName,
		avatarImageClassName,
		avatarFallbackClassName,
	} = props;
	console.log(image);
	return (
		<Avatar className={cn(avatarClassName)}>
			{typeof image === "string" && (
				<AvatarImage src={image} className={cn(avatarImageClassName)} />
			)}
			{name && (
				<AvatarFallback
					className={cn("bg-primary text-white", avatarFallbackClassName)}
				>
					{image && typeof image !== "string" ? (
						<>{image}</>
					) : (
						getInitials(name)
					)}
				</AvatarFallback>
			)}
		</Avatar>
	);
}
