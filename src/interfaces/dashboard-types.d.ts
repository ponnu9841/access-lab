type Banner = {
	id: string;
	image: string;
	alt?: string;
	title?: string;
	description?: string;
};

type Partner = {
	id: string;
	image: string;
	alt: string;
};

type Gallery = {
	id: string;
	image: string;
	alt: string | null;
	title: string | null;
	description: string | null;
};

type Service = Partner & {
	title: string;
	short_description: string;
	long_description: string;
};

type Testimonial = {
	id: string;
	vido_url?: string;
	image?: string;
	alt?: string;
	name: string;
	designation?: string;
	testimonial: string;
};

type ResponseCommonStructure = {
	current_page: number;

	first_page_url: string | null;
	from: number | null;
	last_page: number;
	last_page_url: string | null;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number | null;
	total: number;
};

type GalleryResponse =
	| (ResponseCommonStructure & {
			data: Gallery[] | [];
	  })
	| null;

type Teams = {
	id: string;
	image: string;
	alt: string | null;
	name: string;
	designation: string | null;
    linkedin_profile: string | null;
};

type Contact = {
	id: string;
	location: string;
	map: string;
	contactno_one: string;
	contactno_two: string | null;
	email_one: string;
	email_two: string | null;
}

type About = {
	id: string;
	title: string;
	sub_title: string | null;
	image_one: string;
	image_two: string;
	image_one_alt: string | null;
	image_two_alt: string | null;
	short_description: string;
	long_description: string | null;
}

type Heading = {
	id: string;
	title: string;
	description: string | null;
	section: string;
}

type PagesBanner = {
	id: string;
	image: string;
	alt: string | null;
	title: string | null;
	page: string;
}

type Seo = {
	id: string;
	title: string;
	description: string;
	page: string;
}
