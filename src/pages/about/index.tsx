import axiosClient from "@/axios/axios-client";
import Layout from "@/components/layout";
import AboutNew from "@/components/section/about/about-2";
import BannerPages from "@/components/section/banner-pages";
import React from "react";

export default function AboutPage({ about }: { about: About | null }) {
  return (
    <>
      <BannerPages image="/banner-page.jpg" title="About Us" />
      <section>{about && <AboutNew aboutData={about} />}</section>
    </>
  );
}

AboutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  try {
    const about = await axiosClient.get("/about");

    return {
      props: {
        about: about.data.data,
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
