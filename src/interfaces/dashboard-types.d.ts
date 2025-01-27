type Banner = {
    id: string;
    image: string;
    title: string;
    description: string;
}

type Partner = {
    id: string;
    image: string;
    alt: string;
}

type Gallery = {
    id: string;
    image: string;
    alt: string | null;
    title: string | null;
    description: string | null;
}

type Service = Partner & {
    title: string;
    short_description: string;
    long_description: string
}

type Testimonial = {
    id: string;
    video_url?: string;
    image?: string;
    alt?: string;
    name: string;
    designation?: string;
    testimonial: string;
    
}

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
}

type GalleryResponse = ResponseCommonStructure & {
    data: Gallery[] | []
} | null
