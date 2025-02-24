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

export const getContactData = (contact: Contact | null) => {
  let contactData = contactDummyData;
  if (contact) {
    contactData = [
      {
        title: "Our Locations",
        icon: "/icons/map.svg",
        line1: contact.location,
        line2: "",
      },
      {
        title: "Give Us A Call",
        icon: "/icons/message.svg",
        line1: `+91 ${contact.contactno_one}`,
        line2: contact.contactno_two ? `+91 ${contact.contactno_two}` : "",
      },
      {
        title: "Help Desk",
        icon: "/icons/help.svg",
        line1: contact.email_one,
        line2: contact.email_two || "",
      },
    ];
  }
  return contactData;
};
