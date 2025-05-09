import SectionTitle from "@/components/custom/section-title";
import React from "react";
import ContactCard, { ContactCardProps } from "./contact-card";
import { getCurrentSectionHeading } from "@/utils";

export default function Contact(props: {
  contactData: ContactCardProps[];
  heading: Heading[];
}) {
  const { contactData, heading } = props;
  const contactHeading = getCurrentSectionHeading(heading, "contact");
  return (
    <>
      <SectionTitle
        title={contactHeading?.title || "We are a full-service creative agency"}
        description={
          contactHeading?.description ||
          "Our team of designers, developers and creatives are perfectionists who love what they do and love"
        }
        headingAnimation="fadeInDown"
        descriptionAnimation="fadeInUp"
      />
      <div className="py-12">
        <div className="flex flex-wrap justify-between items-stretch gap-8">
          {contactData.map((item, index) => (
            <div
              className="bg-card w-full lg:flex-1"
              key={index}
            >
              <ContactCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
