import axiosClient from "@/axios/axios-client";
import Layout from "@/components/layout";
import AboutNew from "@/components/section/about/about-2";
import BannerPages from "@/components/section/banner-pages";
import { getCurrentPageBanner } from "@/utils";
import React from "react";

export default function AboutPage({
  about,
  heading,
  banners,
}: {
  about: About | null;
  heading: Heading[] | [];
  banners: PagesBanner[] | [];
}) {
  const aboutBanner = getCurrentPageBanner(banners, "about");
  return (
    <>
      <BannerPages
        image={aboutBanner?.image || "/banner-page.jpg"}
        title={aboutBanner?.title}
        alt={aboutBanner?.alt || ""}
      />
      <section>
        {about && <AboutNew aboutData={about} heading={heading} />}
      </section>
    </>
  );
}

AboutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  try {
    const [banners, about, heading] = await Promise.all([
      axiosClient.get("/pagesBanner"),
      axiosClient.get("/about"),
      axiosClient.get("heading"),
    ]);

    return {
      props: {
        banners: banners.data.data,
        about: about.data.data,
        heading: heading.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Handle the error appropriately, e.g., redirect to an error page
    return {
      props: {
        error: "Error fetching Data",
      },
    };
  }
}
