import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchContact, setSelectedContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { ContactFormData, contactSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { useAppSelector } from "@/redux/hooks/use-selector";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedContact } = useAppSelector((state) => state.rootReducer.contact);

  const onSubmit = (data: ContactFormData) => {
    setLoading(true);
    const method = data.id ? axiosClient.put : axiosClient.post;
    method("/contact", data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchContact());
          resetForm();
        }
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    reset({
      id: "",
      location: "",
      map: "",
      contactOne: "",
      contactTwo: "",
      emailOne: "",
      emailTwo: "",
    });
    dispatch(setSelectedContact(null));
  }

  useEffect(() => {
    if (selectedContact) {
      reset({
        id: selectedContact.id,
        location: selectedContact.location,
        map: selectedContact.map,
        contactOne: selectedContact.contactno_one,
        contactTwo: selectedContact.contactno_two || undefined,
        emailOne: selectedContact.email_one,
        emailTwo: selectedContact.email_two || undefined,
      });
    }
  }, [selectedContact]); //eslint-disable-line

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}

    >
      <input type="hidden" {...register("id")} />
      <div>
        <Label htmlFor="location">Location</Label>
        <Textarea
          {...register("location")}
          name="location"
          id="location"
          placeholder="Add Location"
          className={errors.location ? "border-red-500" : ""}
          aria-invalid={errors.location ? "true" : "false"}
          aria-describedby={errors.location ? "image-error" : undefined}
        />
        <RenderError error={errors.location?.message} />
      </div>
      <div>
        <Label htmlFor="map">Map</Label>
        <Textarea
          {...register("map")}
          name="map"
          id="map"
          placeholder="Add Map Url"
          className={errors.map ? "border-red-500" : ""}
          aria-invalid={errors.map ? "true" : "false"}
          aria-describedby={errors.map ? "image-error" : undefined}
        />
        <RenderError error={errors.map?.message} />
      </div>
      <div>
        <Label htmlFor="contactOne">Contact Number</Label>
        <Input
          {...register("contactOne")}
          type="text"
          name="contactOne"
          id="contactOne"
          placeholder="Contact Number"
          className={errors.contactOne ? "border-red-500" : ""}
          aria-invalid={errors.contactOne ? "true" : "false"}
          aria-describedby={errors.contactOne ? "image-error" : undefined}
        />
        <RenderError error={errors.contactOne?.message} />
      </div>
      <div>
        <Label htmlFor="contactTwo">Alternate Contact Number</Label>
        <Input
          {...register("contactTwo")}
          type="text"
          name="contactTwo"
          id="contactTwo"
          placeholder="Contact Number"
          className={errors.contactTwo ? "border-red-500" : ""}
          aria-invalid={errors.contactTwo ? "true" : "false"}
          aria-describedby={errors.contactTwo ? "image-error" : undefined}
        />
        <RenderError error={errors.contactTwo?.message} />
      </div>
      <div>
        <Label htmlFor="emailOne">Email</Label>
        <Input
          {...register("emailOne")}
          type="text"
          name="emailOne"
          id="emailOne"
          placeholder="Email"
          className={errors.emailOne ? "border-red-500" : ""}
          aria-invalid={errors.emailOne ? "true" : "false"}
          aria-describedby={errors.emailOne ? "image-error" : undefined}
        />
        <RenderError error={errors.emailOne?.message} />
      </div>
      <div>
        <Label htmlFor="emailTwo">Alternate Email</Label>
        <Input
          {...register("emailTwo")}
          type="text"
          name="emailTwo"
          id="emailTwo"
          placeholder="Email"
          className={errors.emailTwo ? "border-red-500" : ""}
          aria-invalid={errors.emailTwo ? "true" : "false"}
          aria-describedby={errors.emailTwo ? "image-error" : undefined}
        />
        <RenderError error={errors.emailTwo?.message} />
      </div>
      <div className="-mt-1">
        <FormAction loading={loading} reset={() => resetForm()} />
      </div>
    </form>
  );
}
