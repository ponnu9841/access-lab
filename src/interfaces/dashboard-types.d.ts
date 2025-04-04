type Banner = {
   id: string;
   image: string;
   alt?: string;
   title?: string;
   description?: string;
};

type Partner = {
   id: string;
   image: string;
   alt: string;
};

type Gallery = {
   id: string;
   image: string;
   alt: string | null;
   title: string | null;
   description: string | null;
};

type Service = Partner & {
   title: string;
   short_description: string;
   long_description: string;
};

type Testimonial = {
   id: string;
   vido_url?: string;
   image?: string;
   alt?: string;
   name: string;
   designation?: string;
   testimonial: string;
};

type ResponseCommonStructure = {
   current_page: number;

   first_page_url: string | null;
   from: number | null;
   last_page: number;
   last_page_url: string | null;
   links: {
      url: string | null;
      label: string;
      active: boolean;
   }[];
   next_page_url: string | null;
   path: string;
   per_page: number;
   prev_page_url: string | null;
   to: number | null;
   total: number;
};

type PaginationResponse = {
   page: number;
   limit: number;
   totalItems: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
};

type GalleryResponse = PaginationResponse & {
   data: Gallery[] | [];
};

type Teams = {
   id: string;
   image: string;
   alt: string | null;
   name: string;
   designation: string | null;
   linkedin_profile: string | null;
};

type Contact = {
   id: string;
   location: string;
   map: string;
   contactno_one: string;
   contactno_two: string | null;
   email_one: string;
   email_two: string | null;
   default: boolean;
};

type About = {
   id: string;
   title: string;
   sub_title: string | null;
   image_one: string;
   image_two: string;
   image_one_alt: string | null;
   image_two_alt: string | null;
   short_description: string;
   long_description: string | null;
};

type Blog = {
   id: string;
   title: string;
   content: string;
   image: string;
   alt?: string | null;
   createdAt: string;
   updatedAt: string;
}

type BlogResponse = PaginationResponse & {
   data: Blog[] | [];
}

type Heading = {
   id: string;
   title: string;
   description: string | null;
   section: string;
};

type PagesBanner = {
   id: string;
   image: string;
   alt: string | null;
   title: string | null;
   page: string;
};

type Seo = {
   id: string;
   title: string;
   description: string;
   page: string;
};

type Policy = {
   id: string;
   content: string;
   type:
      | "privacy_policy"
      | "terms_conditions"
      | "cancellation_policy"
      | "return_policy";
};

type GrievanceOfficer = {
   id: string;
   name: string;
   email: string
   contact: string;
   designation: string;
   address: string | null;
};

type Career = {
   id: string;
   title: string;
   description: string;
   image: string;
   alt?: string | null;
   url: string;
   button_title?: string | null;
   created_at: string;
   updated_at: string;
}
