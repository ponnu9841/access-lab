import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { SeoFormData, seoSchema } from "@/schemas/schema";
import { capitalizeFirstLetter } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { fetchSeo } from "@/redux/features/seo-slice";
import { Textarea } from "@/components/ui/textarea";

export default function SeoForm({ page }: { page: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SeoFormData>({
    resolver: zodResolver(seoSchema),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { seoTags } = useAppSelector((state) => state.rootReducer.seoTags);
  const currentSeoTag = seoTags.find((tags) => tags.page === page);

  const onSubmit = async (data: SeoFormData) => {
    try {
      setLoading(true);
      const method = data.id ? axiosClient.put : axiosClient.post;
      const response = await method("/seoTags", data);
      if (response.status === 200) {
        reset();
        dispatch(fetchSeo());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentSeoTag) {
      reset({
        id: currentSeoTag.id,
        title: currentSeoTag.title || "",
        description: currentSeoTag.description || "",
      });
    }
  }, [currentSeoTag]); //eslint-disable-line

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
      <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Meta Description"
          className={errors.description ? "border-red-500" : ""}
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "image-error" : undefined}
        />
        <RenderError error={errors.description?.message} />
      </div>

      <div className="-mt-2">
        <FormAction loading={loading} showResetButton={false} />
      </div>
    </form>
  );
}
