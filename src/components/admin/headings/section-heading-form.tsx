import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { HeadingFormData, headingSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import FormAction from "../form-action";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { fetchHeading } from "@/redux/features/heading-slice";
import { capitalizeFirstLetter } from "@/utils";

export default function SectionHeadingForm({ section }: { section: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeadingFormData>({
    resolver: zodResolver(headingSchema),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { headings } = useAppSelector((state) => state.rootReducer.headings);
  const heading = headings.find((heading) => heading.section === section);

  const onSubmit = async (data: HeadingFormData) => {
    try {
      setLoading(true);
      const method = data.id ? axiosClient.put : axiosClient.post;
      const response = await method("/heading", data);

      if (response.status === 200) {
        reset();
        dispatch(fetchHeading());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (heading) {
      reset({
        id: heading.id,
        title: heading.title,
        description: heading.description || "",
      });
    }
  }, [heading]); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{capitalizeFirstLetter(section)}</h3>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("section")} value={section} />
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
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          id="title"
          placeholder="Section Title Description"
          className={errors.title ? "border-red-500" : ""}
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "image-error" : undefined}
        />
        <RenderError error={errors.description?.message} />
      </div>
      <div className="-mt-2">
        <FormAction loading={loading} showResetButton={false} />
      </div>
    </form>
  );
}
