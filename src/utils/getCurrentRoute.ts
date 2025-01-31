export default function getCurrentRoute(pathname: string) {
	switch (pathname) {
		case "/dashboard":
			return "Dashboard";
		case "/dashboard/partners":
			return "Partners";
		case "/dashboard/services":
			return "Services";
		case "/dashboard/testimonials":
			return "Testimonials";
		case "/dashboard/blogs":
			return "Blogs";
		case "/dashboard/teams":
			return "Teams";
		case "/dashboard/contact":
			return "Contact";
		case "/dashboard/gallery":
			return "Gallery";
		case "/dashboard/teams":
			return "Teams";
		default:
			break;
	}
}
