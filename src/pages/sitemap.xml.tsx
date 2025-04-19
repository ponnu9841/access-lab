// pages/sitemap.xml.tsx
import axiosClient from "@/axios/axios-client";
import { GetServerSideProps } from "next";

const Sitemap = () => {
   // This page doesn't need to render anything because we're returning XML from getServerSideProps
   return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   const baseUrl = process.env.BASE_URL;

   // Define your static and dynamic paths
   const staticPaths = ["/", "/about", "/services", "/gallery", "/blog", "/career", "/contact"];

   const services = await axiosClient.get("/service");
    const servicePaths = (services.data.data as Service[]).map((service) => `/services/${service.id}`);

    const allPaths = [...staticPaths, ...servicePaths];


   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
     .map((path) => {
        return `
  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`;
     })
     .join("")}
</urlset>`;

   res.setHeader("Content-Type", "text/xml");
   res.write(sitemap);
   res.end();

   return {
      props: {},
   };
};

export default Sitemap;
