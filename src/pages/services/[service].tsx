import axiosClient from "@/axios/axios-client";
import NextImage from "@/components/Image";
import Layout from "@/components/layout";
import parse from "html-react-parser";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function ServiceDetailsPage({
  service,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container mb-24 mt-32">
      <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
        {service?.image && (
          <NextImage
            className={`aspect-square w-full md:w-1/3`}
            src={service.image}
            imageClassName="object-cover"
          />
        )}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl md:text-4xl">{service?.title}</h2>
          <div className="mt-2 md:mt-4">
            {parse(service?.short_description || "")}
          </div>
          <div className="mt-2 md:mt-4">
            {parse(service?.long_description || "")}
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (async (ctx) => {
  const id = ctx.query.service;
  // Fetch data from external API
  const service: {
    data: {
      data: Service;
    };
  } = await axiosClient.get(`service/${id}`);

  //   //   const service: Service = await res.json();
  //   // Pass data to the page via props
  return { props: { service: service.data.data } };
}) satisfies GetServerSideProps<{ service: Service }>;
