import axiosClient from "@/axios/axios-client";
import ImageUpload from "@/components/custom/imageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPartner } from "@/redux/features/partner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { PartnerFormData, partnerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "@/components/admin/form-action";

export default function PartnerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
  });

  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [existingImage, setExistingImage] = useState("");

  const dispatch = useAppDispatch();
  const { loading, selectedPartner } = useAppSelector(
    (state) => state.rootReducer.partner
  );

  const resetForm = () => {
    reset({
      id: "",
      imageAlt: "",
    });
    setExistingImage("");
  };

  const onSubmit = (data: PartnerFormData) => {
    const formData = new FormData();
    if (images.length > 0) {
      formData.append("image", images[0]);
    }
    formData.append("alt", data.imageAlt);
    if (!data.id) {
      axiosClient
        .post("/partner", formData)
        .then((response) => {
          if (response.status === 200) {
            successCB();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      formData.append("_method", "PUT");
      formData.append("id", data.id);
      axiosClient
        .post("/partner", formData)
        .then((response) => {
          if (response.status === 200) {
            successCB();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function successCB() {
      resetForm();
      dispatch(fetchPartner());
    }
  };

  useEffect(() => {
    if (selectedPartner) {
      reset({
        id: selectedPartner.id,
        imageAlt: selectedPartner.alt || "",
      });
      setExistingImage(selectedPartner.image);
    }
  }, [selectedPartner]); // eslint-disable-line

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
      </div>
      <FormAction reset={resetForm} loading={loading} />
    </form>
  );
}
