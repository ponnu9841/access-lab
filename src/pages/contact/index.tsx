import axiosClient from "@/axios/axios-client";
import SectionTitle from "@/components/custom/section-title";
import HeadTags from "@/components/head-tags";
import Layout from "@/components/layout";
import BannerPages from "@/components/section/banner-pages";
import ContactCard from "@/components/section/contact/contact-card";
import { Card } from "@/components/ui/card";
import {
  getContactData,
  getCurrentMetaTag,
  getCurrentPageBanner,
  getCurrentSectionHeading,
} from "@/utils";

export default function ContactPage({
  contact,
  heading,
  banners,
  metaTags,
}: {
  contact: Contact | null;
  heading: Heading[] | [];
  banners: PagesBanner[] | [];
  metaTags: Seo[] | [];
}) {
  const contactData = getContactData(contact);
  const contactHeading = getCurrentSectionHeading(heading, "contact");
  const contactBanner = getCurrentPageBanner(banners, "contact");
  const currentMetaTag = getCurrentMetaTag(metaTags, "contact");
  return (
    <>
      <HeadTags currentMetaTag={currentMetaTag} />
      <BannerPages
        image={contactBanner?.image || "/banner-page.jpg"}
        title={contactBanner?.title}
        alt={contactBanner?.alt}
      />
      <section className="container md:mb-12">
        <div className="mb-8">
          <SectionTitle
            title={
              contactHeading?.title || "We are a full-service creative agency"
            }
            description={
              contactHeading?.description ||
              "Our team of designers, developers and creatives are perfectionists who love what they do and love"
            }
            headingAnimation="fadeInDown"
            descriptionAnimation="fadeInUp"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <iframe
              src={
                contact?.map ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9076591313856!2d75.7766633!3d11.268198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f17dc076f07%3A0x4a9e60efe16fa084!2sTownin%20Media!5e0!3m2!1sen!2sin!4v1737115703140!5m2!1sen!2sin"
              }
              className="w-full h-full min-h-[300px]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-6 md:col-span-2">
            {contactData.map((item, index) => (
              <Card className="w-full shadow-2xl border-none" key={index}>
                <ContactCard {...item} />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

ContactPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  try {
    const [banners, contact, heading, metaTags] = await Promise.all([
      axiosClient.get("/pagesBanner"),
      axiosClient.get("/contact"),
      axiosClient.get("/heading"),
      axiosClient.get("/seoTags"),
    ]);

    return {
      props: {
        banners: banners.data.data,
        contact: contact.data.data,
        heading: heading.data.data,
        metaTags: metaTags.data.data,
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
