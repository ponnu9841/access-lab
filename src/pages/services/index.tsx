import axiosClient from "@/axios/axios-client";
import HeadTags from "@/components/head-tags";
import NextImage from "@/components/Image";
import Layout from "@/components/layout";
import BannerPages from "@/components/section/banner-pages";
import { Button } from "@/components/ui/button";
import { getCurrentMetaTag, getCurrentPageBanner } from "@/utils";
import parse from "html-react-parser";
import Link from "next/link";

export default function ServicePage({
  services,
  banners,
  metaTags,
}: {
  services: Service[];
  banners: PagesBanner[] | [];
  metaTags: Seo[] | [];
}) {
  const serviceBanner = getCurrentPageBanner(banners, "services");
  const currentMetaTag = getCurrentMetaTag(metaTags, "services");
  return (
    <>
      <HeadTags currentMetaTag={currentMetaTag} />
      <BannerPages
        image={serviceBanner?.image || "/banner-page.jpg"}
        title={serviceBanner?.title}
        alt={serviceBanner?.alt || ""}
      />

      <div className="container mt-12 md:mt-24 mb-12">
        {services.map((service, index) => (
          <div
            className="flex flex-col md:flex-row items-center gap-6 mt-12"
            key={index}
          >
            <NextImage
              className={`aspect-square w-full md:w-1/3 ${
                index % 2 !== 0 ? "md:order-2" : ""
              }`}
              src={service.image}
              imageClassName="object-cover"
            />
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl md:text-4xl">{service.title}</h2>
              <div className="mt-2 md:mt-4">
                {parse(service.short_description)}
              </div>
              <Link href={`/services/${service.id}`}>
                <Button variant="link" className="p-0 text-base underline">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ServicePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  try {
    const [banners, services, metaTags] = await Promise.all([
      axiosClient.get("/pagesBanner"),
      axiosClient.get("/service"),
      axiosClient.get("seoTags"),
    ]);

    return {
      props: {
        banners: banners.data.data,
        services: services.data.data,
        metaTags: metaTags.data.data,
      },
      revalidate: process.env.REVALIDATE_TIME,
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
