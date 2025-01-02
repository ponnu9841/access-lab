type CarouselCardProps = {
	cardContentClassName?: string | undefined;
	cardClassName?: string | undefined;
	carouselItemClassName?: string | undefined;
	children?: React.ReactNode | string;
};

type CarouselSliderProps = CarouselCardProps & {
	images?: { image: string; title: string; description: string }[];
	carouselContentClassName?: string | undefined;
	orientation?: "horizontal" | "vertical" | undefined;
	id?: string;
	togglerPosition?: string;
	showTitle?: boolean;
};
