import NextImage from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { DeleteDrawer } from "@/components/admin/delete-drawer";
import axiosClient from "@/axios/axios-client";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import {
  fetchService,
  setSelectedService,
} from "@/redux/features/service-slice";
import parse from "html-react-parser";
import EditButton from "../edit-button";

export default function UploadedServices() {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(
    (state) => state.rootReducer.service
  );

  const deleteService = async (id: string, image: string) => {
    try {
      const response = await axiosClient.delete(`/service`, {
        params: { id, image },
      });
      if (response && response.status === 200) {
        dispatch(fetchService());
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h2 className="text-xl">Services</h2>

      <div className="grid grid-cols-2 gap-6 max-h-[500px] overflow-auto">
        {!loading && data.length === 0 && (
          <div className="col-span-4 text-center mt-3 text-red-500">
            No Record Found
          </div>
        )}
        {loading &&
          Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))}
        {data.map((service: Service) => (
          <div key={service.id}>
            <div className="relative flex justify-center">
              <NextImage
                src={service.image}
                className="aspect-square max-w-[100px]"
              />
              <div className="absolute bottom-0 right-0">
                <EditButton
                  onClick={() => dispatch(setSelectedService(service))}
                />
                <DeleteDrawer
                  title={`Delete Service ${service.title}`}
                  description={`Are you sure you want to delete this partner? This action cannot be undone.`}
                  onDelete={() => deleteService(service.id, service.image)}
                />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-bold">Title: </span> {service?.title}
            </div>
            <div className="mt-4">
              <span className="font-bold">Short Description </span>{" "}
              {parse(service?.short_description)}
            </div>
            <div className="mt-4">
              <b>Long Description </b>
              {parse(service?.long_description)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
