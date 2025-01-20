export default function getCurrentRoute(pathname: string) {
    switch (pathname) {
        case "/dashboard":
            return "Dashboard";
        case "/dashboard/partners":
            return "Partners";
        case "/dashboard/gallery":
            return "Gallery";
        default:
            break;
    }
}