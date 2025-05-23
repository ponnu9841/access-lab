import axiosClient from "@/axios/axios-client";
import Layout from "@/components/layout";
import { Pagination } from "@/components/pagination";
import BannerPages from "@/components/section/banner-pages";
import BlogCard from "@/components/section/blog/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBlog, setPageNo } from "@/redux/features/blog-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { getCurrentPageBanner } from "@/utils";
import { useEffect } from "react";

export default function BlogPage({ banners }: { banners: PagesBanner[] | [] }) {
   const galleryBanner = getCurrentPageBanner(banners, "blog");
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchBlog({ controller }));
      return () => controller.abort();
   }, []); //eslint-disable-line

   const { blogs, loading, pageNo } = useAppSelector(
      (state) => state.rootReducer.blogs
   );
   const lastPage = blogs?.totalPages;
   return (
      <>
         <BannerPages
            image={galleryBanner?.image || "/banner-page.jpg"}
            title={galleryBanner?.title}
            alt={galleryBanner?.alt || ""}
         />

         {!loading && blogs?.data.length === 0 && (
            <div className="col-span-4 text-center text-red-500 mt-12 md:mt-20">
               No Record Found
            </div>
         )}

         {loading &&
            Array(6)
               .fill(null)
               .map((_, index) => (
                  <Skeleton key={index} className="aspect-square" />
               ))}

         <div className="container">
            {!!blogs?.data.length && (
               <div className="flex flex-col md:flex-row gap-8 flex-wrap items-stretch justify-center mt-12">
                  {blogs?.data.map((blog) => (
                     <div
                        className="md:w-[calc(50%-1rem)] lg:w-[calc(32%-1rem)] min-h-[400px]"
                        key={blog.id}
                     >
                        <BlogCard {...blog} />
                     </div>
                  ))}
               </div>
            )}
            {!loading && blogs?.data.length ? (
               <div className="mt-6">
                  <Pagination
                     pageNo={pageNo}
                     setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
                     totalPages={lastPage || 1}
                  />
               </div>
            ) : (
               <></>
            )}
         </div>
      </>
   );
}

BlogPage.getLayout = function getLayout(page: React.ReactElement) {
   return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
   try {
      const banners = await axiosClient.get("/pagesBanner");

      return {
         props: {
            banners: banners.data.data,
         },
         revalidate: process.env.REVALIDATE_TIME
            ? +process.env.REVALIDATE_TIME
            : 0,
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
