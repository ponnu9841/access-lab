import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "./scroll-to-top";
import LoaderAnimation from "./loader";
import CustomCursor from "../custom-cursor";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoaderAnimation />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <CustomCursor />
    </>
  );
}
