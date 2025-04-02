import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAbout } from "@/redux/features/about-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { AboutFormData, aboutSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormAction from "../form-action";
import { useAppSelector } from "@/redux/hooks/use-selector";
import TextEditor from "@/components/ui/text-editor";
import ImageUpload from "@/components/custom/imageUpload";

export default function AboutForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
  });

  const [imageLeft, setImageLeft] = useState<ExtendedFile[]>([]);
  const [imageRight, setImageRight] = useState<ExtendedFile[]>([]);
  const [existingImageLeft, setExistingImageLeft] = useState("");
  const [existingImageRight, setExistingImageRight] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { aboutData } = useAppSelector((state) => state.rootReducer.about);

  const onSubmit = (data: AboutFormData) => {
    setLoading(true);
    const form = new FormData();
    form.append("title", data.title);
    form.append("subTitle", data.subTitle || "");
    form.append("imageOneAlt", data.imageOneAlt || "");
    form.append("imageTwoAlt", data.imageTwoAlt || "");
    form.append("shortDescription", data.shortDescription);
    form.append("longDescription", data.longDescription || "");
    if (imageLeft.length > 0) {
      form.append("imageOne", imageLeft[0]);
    }
    if (imageRight.length > 0) {
      form.append("imageTwo", imageRight[0]);
    }
    if (data.id) {
      form.append("id", data.id);
    }
    const method = data.id ? axiosClient.put : axiosClient.post
    method("/about", form)
      .then((response) => {
        if (response.status === 200) {
          reset();
          dispatch(fetchAbout());
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (aboutData) {
      reset({
        id: aboutData.id,
        title: aboutData.title,
        subTitle: aboutData.sub_title || "",
        imageOneAlt: aboutData.image_one_alt || "",
        imageTwoAlt: aboutData.image_two_alt || "",
        shortDescription: aboutData.short_description,
        longDescription: aboutData.long_description || "",
      });
      setExistingImageLeft(aboutData.image_one);
      setExistingImageRight(aboutData.image_two);
    }
  }, [aboutData]); //eslint-disable-line

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <input type="hidden" {...register("id")} />
      <div>
        <div className="my-4">
          <Label htmlFor="location">Title</Label>
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
        <div className="mt-4 border border-input rounded-md py-6 px-4">
          <div className="text-sm">Left Image</div>
          <ImageUpload
            images={imageLeft}
            setImages={setImageLeft}
            existingImage={existingImageLeft}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="location">Title</Label>
          <Input
            {...register("imageOneAlt")}
            name="imageOneAlt"
            id="imageOneAlt"
            placeholder="Image Left Alt Text"
            className={errors.imageOneAlt ? "border-red-500" : ""}
            aria-invalid={errors.imageOneAlt ? "true" : "false"}
            aria-describedby={errors.imageOneAlt ? "image-error" : undefined}
          />
          <RenderError error={errors.imageOneAlt?.message} />
        </div>
        <div className="mt-4">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Controller
            name="shortDescription"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextEditor value={value} setValue={onChange} />
            )}
          />
          <RenderError error={errors.shortDescription?.message} />
        </div>
      </div>

      <div>
        <div className="my-4">
          <Label htmlFor="subTitle">Sub Title</Label>
          <Input
            {...register("subTitle")}
            name="subTitle"
            id="subTitle"
            placeholder="Sub Title"
            className={errors.subTitle ? "border-red-500" : ""}
            aria-invalid={errors.subTitle ? "true" : "false"}
            aria-describedby={errors.subTitle ? "image-error" : undefined}
          />
          <RenderError error={errors.subTitle?.message} />
        </div>
        <div className="mt-4 border border-input rounded-md py-6 px-4">
          <div className="text-sm">Right Image</div>
          <ImageUpload
            images={imageRight}
            setImages={setImageRight}
            existingImage={existingImageRight}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="location">Title</Label>
          <Input
            {...register("imageTwoAlt")}
            name="imageTwoAlt"
            id="imageTwoAlt"
            placeholder="Image Right Alt Text"
            className={errors.imageTwoAlt ? "border-red-500" : ""}
            aria-invalid={errors.imageTwoAlt ? "true" : "false"}
            aria-describedby={errors.imageTwoAlt ? "image-error" : undefined}
          />
          <RenderError error={errors.imageTwoAlt?.message} />
        </div>
        <div className="mt-4">
          <Label htmlFor="longDescription">Long Description</Label>
          <Controller
            name="longDescription"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextEditor value={value} setValue={onChange} />
            )}
          />
          <RenderError error={errors.longDescription?.message} />
        </div>
      </div>

      <div className="col-span-2 -mt-8">
        <FormAction loading={loading} showResetButton={false} />
      </div>
    </form>
  );
}
