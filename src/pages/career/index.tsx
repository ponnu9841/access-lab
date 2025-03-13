import axiosClient from "@/axios/axios-client";
import HeadTags from "@/components/head-tags";
import Layout from "@/components/layout";
import BannerPages from "@/components/section/banner-pages";
import { getCurrentMetaTag, getCurrentPageBanner } from "@/utils";

export default function ServicePage({
  banners,
  metaTags,
}: {
  banners: PagesBanner[] | [];
  metaTags: Seo[] | [];
}) {
  const serviceBanner = getCurrentPageBanner(banners, "career");
  const currentMetaTag = getCurrentMetaTag(metaTags, "career");
  return (
    <>
      <HeadTags currentMetaTag={currentMetaTag} />
      <BannerPages
        image={serviceBanner?.image || "/banner-page.jpg"}
        title={serviceBanner?.title}
        alt={serviceBanner?.alt || ""}
      />

      <div className="container mt-12 md:mt-24 mb-12">
        <h2>Career Page</h2>
      </div>
    </>
  );
}

ServicePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  try {
    const [banners, metaTags] = await Promise.all([
      axiosClient.get("/pagesBanner"),
      axiosClient.get("seoTags"),
    ]);

    return {
      props: {
        banners: banners.data.data,
        metaTags: metaTags.data.data,
      },
      revalidate: process.env.REVALIDATE_TIME
        ? +process.env.REVALIDATE_TIME
        : 0,
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
