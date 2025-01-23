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

type Service = Partner & {
    title: string;
    short_description: string;
    long_description: string
}