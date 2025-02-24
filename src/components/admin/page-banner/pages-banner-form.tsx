import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPagesBanner } from "@/redux/features/pages-banner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { PagesBannerFormData, pagesBannerSchema } from "@/schemas/schema";
import { capitalizeFirstLetter } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import ImageUpload from "@/components/custom/imageUpload";

export default function PagesBannerForm({ page }: { page: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PagesBannerFormData>({
    resolver: zodResolver(pagesBannerSchema),
  });

  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { banners } = useAppSelector((state) => state.rootReducer.pagesBanner);
  const currentBanner = banners.find((banner) => banner.page === page);

  const onSubmit = async (data: PagesBannerFormData) => {
    const formData = new FormData();
    formData.append("alt", data.alt || "");
    formData.append("title", data.title || "");
    formData.append("page", data.page);
    if (images.length > 0) {
      formData.append("image", images[0]);
    }
    if (data.id) {
      formData.append("id", data.id);
      formData.append("_method", "PUT");
    }
    try {
      setLoading(true);
      const response = await axiosClient.post("/pagesBanner", formData);

      if (response.status === 200) {
        reset({
          id: "",
          title: "",
          alt: "",
        });
        setImages([]);
        setExistingImage("");
        dispatch(fetchPagesBanner());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentBanner) {
      reset({
        id: currentBanner.id,
        title: currentBanner.title || "",
        alt: currentBanner.alt || "",
      });
      setExistingImage(currentBanner.image);
    }
  }, [currentBanner]); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{capitalizeFirstLetter(page)}</h3>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("page")} value={page} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          type="text"
          name="title"
          id="title"
          placeholder="Section Title"
          className={errors.title ? "border-red-500" : ""}
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "image-error" : undefined}
        />
        <RenderError error={errors.title?.message} />
      </div>
      <div className="mt-4 border border-input rounded-md py-6 px-4">
        <div className="text-sm">Image</div>
        <ImageUpload
          images={images}
          setImages={setImages}
          existingImage={existingImage}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="alt">Title</Label>
        <Input
          {...register("alt")}
          type="text"
          id="alt"
          placeholder="Image Alt Text"
          className={errors.alt ? "border-red-500" : ""}
          aria-invalid={errors.alt ? "true" : "false"}
          aria-describedby={errors.alt ? "image-error" : undefined}
        />
        <RenderError error={errors.alt?.message} />
      </div>

      <div className="-mt-2">
        <FormAction loading={loading} showResetButton={false} />
      </div>
    </form>
  );
}
