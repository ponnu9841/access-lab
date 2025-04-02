export default function getCurrentRoute(pathname: string) {
  switch (pathname) {
    case "/":
      return "Home";
    case "/about":
      return "About";
    case "/services":
      return "Services";
    case "/contact":
      return "Contact";
    case "/career":
      return "Career";
    case "/blog":
      return "Blog";
    case "/dashboard":
      return "Dashboard";
    case "/dashboard/about":
      return "About";
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
    case "/dashboard/miscellaneous":
      return "Miscellaneous";
    default:
      break;
  }
}
