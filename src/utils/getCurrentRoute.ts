export default function getCurrentRoute(pathname: string) {
    switch (pathname) {
        case "/dashboard":
            return "Dashboard";
        default:
            break;
    }
}