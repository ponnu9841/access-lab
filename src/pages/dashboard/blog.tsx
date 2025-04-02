import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";
import { fetchBlog } from "@/redux/features/blog-slice";
import BlogForm from "@/components/admin/blog/form";
import Blog from "@/components/admin/blog/blog";

export default function BlogPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchBlog({ controller }));
      return () => controller.abort();
   }, []); //eslint-disable-line
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
            <BlogForm />
         </div>
         <div>
            <Blog />
         </div>
      </div>
   );
}

BlogPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
