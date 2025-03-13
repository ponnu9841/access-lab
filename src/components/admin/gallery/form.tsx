import axiosClient from "@/axios/axios-client";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchGallery } from "@/redux/features/gallery-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { GalleryFormData, gallerySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";

export default function GalleryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
  });

  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { pageNo, selectedGallery } = useAppSelector(
    (state) => state.rootReducer.gallery
  );

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

  const onSubmit = (data: GalleryFormData) => {
    setLoading(true);
    const formData = new FormData();
    if (images.length > 0) {
      formData.append("image", images[0]);
    }
    formData.append("alt", data.imageAlt || "");
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    if (data.id) {
      formData.append("id", data.id);
    }
    const method = data.id ? axiosClient.put : axiosClient.post;
    method("/gallery", formData)
      .then((response) => {
        if (response.status === 200) {
          resetForm();
          dispatch(fetchGallery({ pageNo }));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (selectedGallery) {
      reset({
        id: selectedGallery.id,
        imageAlt: selectedGallery.alt || "",
        title: selectedGallery.title || "",
        description: selectedGallery.description || "",
      });
      setExistingImage(selectedGallery.image);
    }
  }, [selectedGallery]); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <ImageUpload
          images={images}
          setImages={setImages}
          existingImage={existingImage}
        />
      </div>
      <div className="my-4">
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
        <RenderError error={errors.imageAlt?.message} />
      </div>
      <div className="my-4">
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          type="text"
          name="title"
          id="title"
          placeholder="Image alt"
          className={errors.title ? "border-red-500" : ""}
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "image-error" : undefined}
        />
        <RenderError error={errors.title?.message} />
      </div>
      <div className="my-4">
        <Label htmlFor="description">Description</Label>
        <Input
          {...register("description")}
          type="text"
          name="description"
          id="description"
          placeholder="Image alt"
          className={errors.description ? "border-red-500" : ""}
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "image-error" : undefined}
        />
        <RenderError error={errors.description?.message} />
      </div>
      <FormAction loading={loading} reset={() => resetForm()} />
    </form>
  );
}
