import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "./scroll-to-top";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
			<ScrollToTop />
		</>
	);
}
