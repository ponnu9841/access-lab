import { ReactNode } from "react";

export type AvatarProps = {
	name?: string;
	image?: string;
	avatarClassName?: string;
	avatarImageClassName?: string;
	avatarFallbackClassName?: string;
    avatarIconClassName?: string
	icon?: ReactNode;
};
