import SectionHeading from "@/components/custom/section-heading";
import SectionLayout from "@/components/custom/section-layout";
import SectionTitle from "@/components/custom/section-title";
import TitleBadge from "@/components/custom/title-badge2";
import { Button } from "@/components/ui/button";
import ParallaxTiltMultiple from "@/components/ui/parallax/parallax-multiple";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AboutNew({ aboutData }: { aboutData: About }) {
  const router = useRouter();
  return (
    <div className="container">
      <SectionTitle
        title="We are a full-service creative agency"
        description="Our team of designers, developers and creatives are perfectionists who love what they do and love"
        headingAnimation="fadeInDown"
        descriptionAnimation="fadeInUp"
      />
      <div className="mt-12">
        <SectionLayout
          sectionLeft={
            <ParallaxTiltMultiple
              leftImage={
                aboutData.image_one || "/about/home_agency_about_2.jpg"
              }
              rightImage={
                aboutData.image_two || "/about/home_agency_about_1.jpg"
              }
            />
          }
          sectionRight={
            <div className="max-w-md">
              <div className="md:hidden">
                <TitleBadge
                  title={
                    aboutData.sub_title || "Every day brings new challenges"
                  }
                  animation="fadeInDown"
                />
              </div>
              <div className="hidden md:block">
                <TitleBadge
                  title={
                    aboutData.sub_title || "Every day brings new challenges"
                  }
                  animation="slideInRight"
                />
              </div>
              <SectionHeading
                title={
                  aboutData.title ||
                  "Creative agency focused on vision, product and people"
                }
                description={
                  router.pathname === "/about"
                    ? aboutData.long_description ?? ""
                    : aboutData?.short_description ??
                      "<p>We’re boldly individual, always original and refreshingly easy-going. Our vision, passion and ideas are matched with focus, expertise and flair.</p>"
                }
                headingAnimation="fadeInUp"
              />
              <Link href="/about">
                <Button size="lg" className="mt-3">
                  About Us
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}
