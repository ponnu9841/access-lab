import axiosClient from "@/axios/axios-client";
import Heading from "@/components/custom/heading";
import NextImage from "@/components/Image";
import Layout from "@/components/layout";
import { NextPageContext } from "next";
import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import { formatDateToMonthYear } from "@/utils";

export default function BlogDetailsPage({ blog }: { blog: Blog }) {
   return (
      <div className="container mt-32">
         <div className="max-w-[700px] mx-auto">
            <NextImage
               src={blog.image}
               alt={blog.title}
               className="aspect-square max-h-[400px]"
            />
            <div className="flex gap-x-2 items-center text-muted-foreground text-sm mb-4">
               <Calendar size={16} />{" "}
               <span>{formatDateToMonthYear(blog.createdAt)}</span>
            </div>
            <Heading title={blog.title} variant="h1" className="my-4" />
            <div className="[&>ul]:list-disc [&>ul]:ml-8">
               {parse(blog.content)}
            </div>
         </div>
      </div>
   );
}

BlogDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <Layout>{page}</Layout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
   const id = ctx.query.blog;
   try {
      const blog = await axiosClient.get(`/blog/${id}`);

      return {
         props: {
            blog: blog.data.data,
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
