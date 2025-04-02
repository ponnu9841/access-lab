import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { CareerFormData, careerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormAction from "../form-action";
import { useAppSelector } from "@/redux/hooks/use-selector";
import TextEditor from "@/components/ui/text-editor";
import ImageUpload from "@/components/custom/imageUpload";
import { fetchCareer } from "@/redux/features/career-slice";

export default function CareerForm() {
   const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<CareerFormData>({
      resolver: zodResolver(careerSchema),
   });

   const [image, setImage] = useState<ExtendedFile[]>([]);
   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

   const dispatch = useAppDispatch();
   const { careerData } = useAppSelector((state) => state.rootReducer.career);

   const onSubmit = (data: CareerFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("title", data.title);
      form.append("description", data.description || "");
      form.append("imageAlt", data.imageAlt || "");
      form.append("url", data.url);
      form.append("buttonTitle", data.buttonTitle || "");
      if (image.length > 0) {
         form.append("image", image[0]);
      }
      if (data.id) {
         form.append("id", data.id);
      }
      const method = data.id ? axiosClient.put : axiosClient.post;
      method("/career", form)
         .then((response) => {
            if (response.status === 200) {
               reset();
               dispatch(fetchCareer());
            }
         })
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      if (careerData) {
         reset({
            id: careerData.id,
            title: careerData.title,
            description: careerData.description || "",
            imageAlt: careerData.alt || "",
            url: careerData.url || "",
         });
         setExistingImage(careerData.image);
      }
   }, [careerData]); //eslint-disable-line

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
         <input type="hidden" {...register("id")} />
         <div>
            <div className="mb-4">
               <Label htmlFor="title">Title</Label>
               <Input
                  {...register("title")}
                  name="title"
                  id="title"
                  placeholder="Title"
                  className={errors.title ? "border-red-500" : ""}
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby={errors.title ? "image-error" : undefined}
               />
               <RenderError error={errors.title?.message} />
            </div>
            <div className="mt-4">
               <Label htmlFor="description">Description</Label>
               <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <TextEditor
                        value={value}
                        setValue={onChange}
                        height={300}
                     />
                  )}
               />
               <RenderError error={errors.description?.message} />
            </div>
         </div>

         <div>
            <div className="mt-4 border border-input rounded-md py-6 px-4">
               <div className="text-sm">Image</div>
               <ImageUpload
                  images={image}
                  setImages={setImage}
                  existingImage={existingImage}
               />
            </div>
            <div className="my-4">
               <Label htmlFor="alt">Image Alt</Label>
               <Input
                  {...register("imageAlt")}
                  name="imageAlt"
                  id="imageAlt"
                  placeholder="Image Alt"
                  className={errors.imageAlt ? "border-red-500" : ""}
                  aria-invalid={errors.imageAlt ? "true" : "false"}
                  aria-describedby={errors.imageAlt ? "image-error" : undefined}
               />
               <RenderError error={errors.imageAlt?.message} />
            </div>

            <div className="my-4">
               <Label htmlFor="url">Url</Label>
               <Input
                  {...register("url")}
                  name="url"
                  id="url"
                  placeholder="Url"
                  className={errors.url ? "border-red-500" : ""}
                  aria-invalid={errors.url ? "true" : "false"}
                  aria-describedby={errors.url ? "image-error" : undefined}
               />
               <RenderError error={errors.url?.message} />
            </div>

            <div>
               <Label htmlFor="buttonTitle">Button Title</Label>
               <Input
                  {...register("buttonTitle")}
                  name="buttonTitle"
                  id="buttonTitle"
                  placeholder="Button Title"
                  className={errors.buttonTitle ? "border-red-500" : ""}
                  aria-invalid={errors.buttonTitle ? "true" : "false"}
                  aria-describedby={
                     errors.buttonTitle ? "image-error" : undefined
                  }
               />
               <RenderError error={errors.buttonTitle?.message} />
            </div>
         </div>

         <div className="col-span-2 -mt-8">
            <FormAction loading={loading} showResetButton={false} />
         </div>
      </form>
   );
}
