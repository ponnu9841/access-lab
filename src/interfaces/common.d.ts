import { ReactNode, SVGProps } from "react";

export type AvatarProps = {
	name?: string;
	image?: string;
	avatarClassName?: string;
	avatarImageClassName?: string;
	avatarFallbackClassName?: string;
	avatarIconClassName?: string;
	icon?: ReactNode;
};

export type SvgIconProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type ServiceCardProps = {
	icon: React.JSX.Element;
	hoverIcon: React.JSX.Element;
	title: string ;
	description?: string;
	children: ReactNode;
	variant?: "primary" | "secondary"
}
