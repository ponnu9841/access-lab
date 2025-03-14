import { contactData as contactDummyData } from "@/services/dummyData";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatDateToMonthYear(dateString: string) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Define an array of short month names
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month and year
  const month = shortMonths[date.getMonth()];
  const year = date.getFullYear();
  const day = `0${date.getDate()}`.slice(-2);

  // Return the formatted string
  // return `${month} ${year}`;
  return `${day} ${month} ${year}`;
}

export async function urlToFile(url: string, filename: string): Promise<File> {
  // Fetch the content from the URL
  const response = await fetch(url, {
    mode: "no-cors",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }

  // Get the data as a Blob
  const blob = await response.blob();

  // Create a File from the Blob
  return new File([blob], filename, { type: blob.type });
}

export const getContactData = (contact: Contact[] | null) => {
  let contactData = contactDummyData;
  const defaultContact = getDefultContact(contact)
  if (defaultContact) {
    contactData = [
      {
        title: "Our Locations",
        icon: "/icons/map.svg",
        line1: defaultContact.location,
        line2: "",
      },
      {
        title: "Give Us A Call",
        icon: "/icons/message.svg",
        line1: `+91 ${defaultContact.contactno_one}`,
        line2: defaultContact.contactno_two ? `+91 ${defaultContact.contactno_two}` : "",
      },
      {
        title: "Help Desk",
        icon: "/icons/help.svg",
        line1: defaultContact.email_one,
        line2: defaultContact.email_two || "",
      },
    ];
  }
  return contactData;
};

export const getContact = (contact: Contact[] | null) => {
  let contactData = contactDummyData;
  const defaultContact = getDefultContact(contact)
  if (defaultContact) {
    contactData = [
      {
        title: "Give Us A Call",
        icon: "/icons/message.svg",
        line1: `+91 ${defaultContact.contactno_one}`,
        line2: defaultContact.contactno_two ? `+91 ${defaultContact.contactno_two}` : "",
      },
      {
        title: "Help Desk",
        icon: "/icons/help.svg",
        line1: defaultContact.email_one,
        line2: defaultContact.email_two || "",
      },
    ];
  }
  const contactLocation = contact?.map((c) => ({
    title: "Our Locations",
    icon: "/icons/map.svg",
    line1: c.location,
    line2: "",
  }));
  return {contactData, contactLocation};
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSectionHeadings() {
  return ["about", "services", "testimonials", "teams", "gallery", "contact"];
}

export function getPages() {
  return ["home", "about", "services", "contact", "career"];
}

export function getPolicies() {
  return [
    "privacy_policy",
    "terms_conditions",
    "cancellation_policy",
    "return_policy",
  ];
}

export function getPolicy(policies: Policy[] | null, policy: string) {
  return policies?.find((p) => p.type === policy);
}

export function formatPolicyName(policy: string): string {
  const policyMap: { [key: string]: string } = {
    privacy_policy: "Privacy Policy",
    terms_conditions: "Terms & Conditions",
    cancellation_policy: "Cancellation Policy",
    return_policy: "Refund Policy",
  };
  return policyMap[policy] || "Unknown Policy";
}

export function getCurrentSectionHeading(headings: Heading[], section: string) {
  return headings?.find((heading) => heading.section === section);
}

export function getCurrentPageBanner(banners: PagesBanner[], page: string) {
  return banners?.find((banner) => banner.page === page);
}

export function getCurrentMetaTag(metaTags: Seo[], page: string) {
  return metaTags?.find((metaTag) => metaTag.page === page);
}

export const getLayoutProps = (page: React.ReactElement) => {
  return page.props.children.length > 0 ? page.props.children[0].props : [];
};

export const getDefultContact = (contact: Contact[] | null) => {
  return contact?.find(e => e.default === true);
}
