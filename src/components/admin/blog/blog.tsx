import NextImage from "@/components/Image";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { DeleteDrawer } from "../delete-drawer";
import axiosClient from "@/axios/axios-client";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EditButton from "@/components/admin/edit-button";
import { fetchBlog, setSelectedBlog, setPageNo } from "@/redux/features/blog-slice";
import parse from "html-react-parser";

export default function Gallery() {
   const dispatch = useAppDispatch();
   const { loading, pageNo, blogs } = useAppSelector(
      (state) => state.rootReducer.blogs
   );

   const lastPage = blogs?.totalPages;

   const deleteBlog = async (id: string, image: string) => {
      try {
         const response = await axiosClient.delete(`/blog`, {
            params: { id, image },
         });
         if (response && response.status === 200) {
            dispatch(fetchBlog({ pageNo }));
         }
      } catch (error) {
         throw error;
      }
   };

   return (
      <div>
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-auto">
            {loading &&
               Array(6)
                  .fill(null)
                  .map((_, index) => (
                     <Skeleton key={index} className="aspect-square" />
                  ))}
            {!loading && blogs?.data.length === 0 && (
               <div className="col-span-4 text-center mt-3 text-red-500">
                  No Record Found
               </div>
            )}
            {!loading &&
               blogs?.data.map((blog: Blog) => (
                  <div key={blog.id}>
                     <div className="relative">
                        <NextImage className="aspect-square" src={blog.image} />
                        <div className="absolute bottom-0 right-0">
                           <EditButton
                              onClick={() => dispatch(setSelectedBlog(blog))}
                           />
                           <DeleteDrawer
                              title={`Delete Blog ${blog.title}`}
                              description={`Are you sure you want to delete this blog? This action cannot be undone.`}
                              onDelete={() => deleteBlog(blog.id, blog.image)}
                           />
                        </div>
                     </div>
                     <div className="mt-3">
                        <b>Title </b> {blog.title}
                     </div>
                     <div className="mt-3">
                        <b>Description </b> {parse(blog.content)}
                     </div>
                  </div>
               ))}
         </div>
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
   );
}
