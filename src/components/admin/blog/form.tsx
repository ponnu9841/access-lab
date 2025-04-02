import axiosClient from "@/axios/axios-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/text-editor";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { fetchBlog } from "@/redux/features/blog-slice";
import { BlogFormData, blogSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import FormAction from "../form-action";

export default function BlogForm() {
   const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<BlogFormData>({
      resolver: zodResolver(blogSchema),
   });

   const dispatch = useAppDispatch();
   const [images, setImages] = useState<ExtendedFile[]>([]);
   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);
   const { selectedBlog } = useAppSelector((state) => state.rootReducer.blogs);

   const resetForm = () => {
      reset({
         id: "",
         title: "",
         content: "",
      });
      setImages([]);
      setExistingImage("");
   };

   const onSubmit = (data: BlogFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("title", data.title);
      form.append("content", data.content);
      form.append("imageAlt", data.imageAlt || "");
      if (images.length > 0) {
         form.append("image", images[0]);
      }
      if (data.imageAlt) {
         form.append("alt", data.imageAlt);
      }
      if (data.id) {
         form.append("id", data.id);
      }
      const method = data.id ? axiosClient.put : axiosClient.post;
      method("/blog", form)
         .then((response) => {
            if (response.status === 200) {
               successCB();
            }
         })
         .catch((error) => {
            console.log(error);
            setLoading(false);
         })
         .finally(() => setLoading(false));

      function successCB() {
         resetForm();
         dispatch(fetchBlog({}));
      }
   };

   useEffect(() => {
      if (selectedBlog) {
         reset({
            id: selectedBlog.id,
            title: selectedBlog.title,
            content: selectedBlog.content,
            imageAlt: selectedBlog.alt || "",
         });
         setExistingImage(selectedBlog.image);
      }
   }, [selectedBlog]); //eslint-disable-line

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <input type="hidden" {...register("id")} />
         <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
               {...register("title")}
               type="text"
               name="title"
               id="title"
               className={errors.title ? "border-red-500" : ""}
               aria-invalid={errors.title ? "true" : "false"}
               aria-describedby={
                  errors.title ? "service-name-error" : undefined
               }
               placeholder="Service Name"
            />
            <RenderError error={errors.title?.message} />
         </div>
         <div className="mt-4 border px-4 py-4 rounded-sm">
            <ImageUpload
               images={images}
               setImages={setImages}
               existingImage={existingImage}
            />
         </div>
         {images.length > 0 && (
            <div className="mt-0">
               <Label htmlFor="imageAlt">Image Alt</Label>
               <Input
                  {...register("imageAlt")}
                  type="text"
                  name="imageAlt"
                  id="imageAlt"
                  placeholder="Image alt"
                  className={errors.imageAlt ? "border-red-500" : ""}
                  aria-invalid={errors.imageAlt ? "true" : "false"}
                  aria-describedby={errors.imageAlt ? "image-error" : undefined}
               />
            </div>
         )}
         <div className="mt-4">
            <Label htmlFor="content">Content</Label>
            <Controller
               name="content"
               control={control}
               render={({ field: { onChange, value } }) => (
                  <TextEditor value={value} setValue={onChange} height={200} />
               )}
            />
            <RenderError error={errors.content?.message} />
         </div>
         <FormAction
            reset={() => resetForm()}
            loading={loading}
            setImages={setImages}
         />
      </form>
   );
}
