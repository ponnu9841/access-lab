import axiosClient from "@/axios/axios-client";
import RenderError from "@/components/render-error";
import { Label } from "@/components/ui/label";
import { fetchPolicy } from "@/redux/features/policy-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { PolicyFormData, policySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormAction from "../form-action";
import TextEditor from "@/components/ui/text-editor";
import { formatPolicyName } from "@/utils";

export default function PolicyBannerForm({ type }: { type: string }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PolicyFormData>({
    resolver: zodResolver(policySchema),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { policies } = useAppSelector((state) => state.rootReducer.policies);
  const currentPolicy = policies.find((policy) => policy.type === type);

  const onSubmit = async (data: PolicyFormData) => {
    setLoading(true);
    const method = data.id ? axiosClient.put : axiosClient.post;
    try {
      const response = await method("/policies", data);

      if (response.status === 200) {
        reset({
          id: "",
          content: "",
        });
        dispatch(fetchPolicy());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPolicy) {
      reset({
        id: currentPolicy.id,
        content: currentPolicy.content || "",
      });
    }
  }, [currentPolicy]); //eslint-disable-line

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[500px] overflow-y-auto"
    >
      <h3>{formatPolicyName(type)}</h3>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("type")} value={type} />
      <div>
        <Label htmlFor="title">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div className="rounded border">
              <TextEditor
                value={field.value}
                setValue={field.onChange}
                height={250}
              />
            </div>
          )}
        />
        <RenderError error={errors.content?.message} />
      </div>
      <div className="-mt-2">
        <FormAction loading={loading} showResetButton={false} size={"sm"} />
      </div>
    </form>
  );
}
