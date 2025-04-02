import axiosClient from "@/axios/axios-client";
import HeadTags from "@/components/head-tags";
import NextImage from "@/components/Image";
import Layout from "@/components/layout";
import BannerPages from "@/components/section/banner-pages";
import { fetchCareer } from "@/redux/features/career-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { getCurrentMetaTag, getCurrentPageBanner } from "@/utils";
import { useEffect } from "react";
import parse from "html-react-parser"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicePage({
  banners,
  metaTags,
}: {
  banners: PagesBanner[] | [];
  metaTags: Seo[] | [];
}) {
  const serviceBanner = getCurrentPageBanner(banners, "career");
  const currentMetaTag = getCurrentMetaTag(metaTags, "career");
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchCareer(controller));
    // dispatch partner
    return () => controller.abort();
  }, []); //eslint-disable-line

  const { careerData } = useAppSelector((state) => state.rootReducer.career);
  return (
    <>
      <HeadTags currentMetaTag={currentMetaTag} />
      <BannerPages
        image={serviceBanner?.image || "/banner-page.jpg"}
        title={serviceBanner?.title}
        alt={serviceBanner?.alt || ""}
      />

      <div className="container mt-12 md:mt-24 mb-12">
        <div className="lg:flex gap-16 flex-wrap items-start">
          <div className="lg:w-[calc(40%-2rem)]">
            <NextImage src={careerData?.image || ""} className="aspect-square" />
          </div>
          <div className="flex-1 lg:mb-24">
            {parse(careerData?.description || "")}
            <Link href={careerData?.url || ""} target="_blank">
              <Button>{careerData?.button_title || "View"}</Button>
            </Link>
            
          </div>
        </div>
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
