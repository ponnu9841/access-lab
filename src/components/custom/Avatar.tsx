// "use client"
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@/interfaces/common";
// import { User, type LucideIcon } from "lucide-react";

// const sizeClasses = {
// 	sm: "h-8 w-8",
// 	md: "h-10 w-10",
// 	lg: "h-12 w-12",
// };

export default function RenderAvatar(props: AvatarProps) {
	const {
		name,
		image,
		icon,
		avatarClassName,
		avatarImageClassName,
		avatarFallbackClassName,
		avatarIconClassName,
	} = props;

	return (
		<Avatar className={"h-16 w-16 " + avatarClassName || ""}>
			{image && (
				<AvatarImage
					src={image}
					alt={name}
					className={avatarImageClassName || ""}
				/>
			)}

			<AvatarFallback className={cn(avatarFallbackClassName)}>
				{icon
					? React.createElement(
							"span",
							{ className: cn(avatarIconClassName) },
							icon
					  )
					: name && getInitials(name)}
			</AvatarFallback>
		</Avatar>
	);
}
