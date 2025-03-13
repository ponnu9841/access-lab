import axiosClient from "@/axios/axios-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { GrievanceOfficerFormData, grievanceOfficerSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { Textarea } from "@/components/ui/textarea";
import { fetchGrievanceOfficer } from "@/redux/features/grievance-officer-slice";

export default function GrievanceOfficer() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GrievanceOfficerFormData>({
        resolver: zodResolver(grievanceOfficerSchema),
    });

    const dispatch = useAppDispatch();
    const { loading, grievanceOfficer } = useAppSelector(
        (state) => state.rootReducer.grievanceOfficer
    );

    const onSubmit = (data: GrievanceOfficerFormData) => {
        const method = data.id ? axiosClient.put : axiosClient.post;
        method("/grievance-officer", data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchGrievanceOfficer());
                    resetForm();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const resetForm = () => {
        reset();
    };

    useEffect(() => {
        if (grievanceOfficer) {
            reset({
                id: grievanceOfficer.id,
                name: grievanceOfficer.name,
                email: grievanceOfficer.email,
                contact: grievanceOfficer.contact,
                designation: grievanceOfficer.designation,
                address: grievanceOfficer.address || "",
            });
        }
    }, [grievanceOfficer]); //eslint-disable-line

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
                <input type="hidden" {...register("id")} />

                <div className="mt-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={errors.name ? "border-red-500" : ""}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "title-error" : undefined}
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email")}
                        type="email"
                        id="email"
                        className={errors.email ? "border-red-500" : ""}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "title-error" : undefined}
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                        {...register("contact")}
                        id="contact"
                        className={errors.contact ? "border-red-500" : ""}
                        aria-invalid={errors.contact ? "true" : "false"}
                        aria-describedby={
                            errors.contact ? "contact-error" : undefined
                        }
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                        {...register("designation")}
                        id="designation"
                        className={errors.designation ? "border-red-500" : ""}
                        aria-invalid={errors.designation ? "true" : "false"}
                        aria-describedby={
                            errors.address ? "address-error" : undefined
                        }
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        {...register("address")}
                        id="address"
                        className={errors.address ? "border-red-500" : ""}
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={
                            errors.address ? "address-error" : undefined
                        }
                    />
                </div>

                <FormAction reset={resetForm} loading={loading} />
            </form>
        </div>
    );
}
