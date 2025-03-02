type AvatarProps = {
	name?: string;
	image?: string;
	avatarClassName?: string;
	avatarImageClassName?: string;
	avatarFallbackClassName?: string;
	avatarIconClassName?: string;
	icon?: ReactNode;
};

type SvgIconProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

type ServiceCardProps = {
	icon: React.JSX.Element;
	hoverIcon: React.JSX.Element;
	title: string;
	description?: string;
	children: ReactNode;
	variant?: "primary" | "secondary";
};

type ExtendedFile = File & {
	url: string;
};

type AnimationType =
	| "fadeIn"
	| "fadeInUp"
	| "fadeInDown"
	| "zoomIn"
	| "slideInLeft"
	| "slideInRight"
	| "textAnimation";

type PrivacyPolicyPageProps = {
	policies: Policy[] | null;
  }