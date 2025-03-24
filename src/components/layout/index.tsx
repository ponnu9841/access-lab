import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "./scroll-to-top";
import dynamic from "next/dynamic";
const LoaderAnimation = dynamic(() => import("./loader"), {
  ssr: false,
});
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
