import axiosClient from "@/axios/axios-client";
import ImageUpload from "@/components/custom/imageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchBanner,
} from "@/redux/features/banner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { BannerFormData, bannerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { Textarea } from "@/components/ui/textarea";

export default function BannerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
  });

  const dispatch = useAppDispatch();
  const { loading, selectedBanner } = useAppSelector(
    (state) => state.rootReducer.banner
  );
  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [existingImage, setExistingImage] = useState("");

  const onSubmit = (data: BannerFormData) => {
    const form = new FormData();
    form.append("alt", data.imageAlt || "");
    form.append("title", data.title || "");
    form.append("description", data.description || "");
    if (images.length > 0) {
      form.append("image", images[0]);
    }
    if (!data.id) {
      axiosClient
        .post("/banner", form)
        .then((response) => {
          if (response.status === 200) {
            dispatch(fetchBanner());
            resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      form.append("_method", "PUT");
      form.append("id", data.id);
      axiosClient
        .post("/banner", form)
        .then((response) => {
          if (response.status === 200) {
            dispatch(fetchBanner());
            resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetForm = () => {
    reset({
      id: "",
      imageAlt: "",
      title: "",
      description: "",
    });
    setImages([]);
    setExistingImage("");
  };

  useEffect(() => {
    if (selectedBanner) {
      reset({
        id: selectedBanner.id,
        imageAlt: selectedBanner.alt || "",
        title: selectedBanner.title,
        description: selectedBanner.description,
      });
      setExistingImage(selectedBanner.image);
    }
  }, [selectedBanner]); //eslint-disable-line

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} />
        <div className="mt-4">
          <Label htmlFor="image">Image</Label>
          <ImageUpload
            images={images}
            setImages={setImages}
            existingImage={existingImage}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title")}
            type="text"
            name="title"
            id="title"
            className={errors.title ? "border-red-500" : ""}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="title">Description</Label>
          <Textarea
            {...register("description")}
            name="description"
            id="description"
            className={errors.description ? "border-red-500" : ""}
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
        </div>

        <FormAction reset={resetForm} loading={loading} />
      </form>
    </div>
  );
}
