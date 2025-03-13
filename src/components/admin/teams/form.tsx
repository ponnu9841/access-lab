import axiosClient from "@/axios/axios-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { TeamsFormData, teamsSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/custom/imageUpload";
import RenderError from "@/components/render-error";
import FormAction from "../form-action";
import { Controller, useForm } from "react-hook-form";
import { fetchTeams } from "@/redux/features/teams-slice";
import TextEditor from "@/components/ui/text-editor";

export default function TeamsForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamsFormData>({
    resolver: zodResolver(teamsSchema),
  });

  const dispatch = useAppDispatch();
  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedTeam } = useAppSelector((state) => state.rootReducer.teams);

  const resetForm = () => {
    reset({
      id: "",
      imageAlt: "",
      name: "",
      designation: "",
      lindedInProfile: "",
    });
    setImages([]);
    setExistingImage("");
  };

  const onSubmit = (data: TeamsFormData) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("designation", data.designation || "");
    form.append("alt", data.imageAlt || "");
    form.append("lindedInProfile", data.lindedInProfile || "");
    if (images.length > 0) {
      form.append("image", images[0]);
    }
    if (data.id) {
      form.append("id", data.id);
    }
    const method = data.id ? axiosClient.put : axiosClient.post;
    method("/teams", form)
      .then((response) => {
        if (response.status === 200) {
          resetForm();
          dispatch(fetchTeams());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedTeam) {
      reset({
        id: selectedTeam.id,
        name: selectedTeam.name,
        imageAlt: selectedTeam.alt || "",
        designation: selectedTeam.designation || "",
        lindedInProfile: selectedTeam.linkedin_profile || "", // Assuming you have this field
      });
      setExistingImage(selectedTeam.image);
    }
  }, [selectedTeam]); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name")}
          type="text"
          name="name"
          id="name"
          className={errors.name ? "border-red-500" : ""}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "service-name-error" : undefined}
          placeholder="Team Member Name"
        />
        <RenderError error={errors.name?.message} />
      </div>
      <div className="mt-4">
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
        <Label htmlFor="designation">Designation</Label>
        <Controller
          name="designation"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextEditor
              value={value}
              setValue={onChange}
              placeholder="Enter Designation"
            />
          )}
        />
        <RenderError error={errors.designation?.message} />
      </div>
      <div className="mt-4">
        <Label htmlFor="lindedInProfile">LinkedIn Profile</Label>
        <Input
          {...register("lindedInProfile")}
          type="text"
          name="lindedInProfile"
          id="lindedInProfile"
          placeholder="Linked In Profile Url"
          className={errors.lindedInProfile ? "border-red-500" : ""}
          aria-invalid={errors.lindedInProfile ? "true" : "false"}
          aria-describedby={errors.lindedInProfile ? "image-error" : undefined}
        />
        <RenderError error={errors.lindedInProfile?.message} />
      </div>
      <FormAction reset={reset} loading={loading} setImages={setImages} />
    </form>
  );
}
