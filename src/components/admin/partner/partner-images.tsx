import NextImage from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks/use-selector";
import React from "react";
import { DeleteDrawer } from "../delete-drawer";
import axiosClient from "@/axios/axios-client";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import {
  fetchPartner,
  setSelectedPartner,
} from "@/redux/features/partner-slice";
import EditButton from "../edit-button";

export default function PartnerImages() {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(
    (state) => state.rootReducer.partner
  );

  const deletePartner = async (id: string, image: string) => {
    try {
      const response = await axiosClient.delete(`/partner`, {
        params: { id, image },
      });
      if (response && response.status === 200) {
        dispatch(fetchPartner());
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h2 className="text-xl">Uploaded Images</h2>

      <div className="grid grid-cols-4 gap-6 max-h-[500px] overflow-auto">
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
        {!loading &&
          data.map((partner: Partner) => (
            <div key={partner.id} className="relative">
              <NextImage
                src={partner.image}
                className="aspect-square max-w-[100px]"
              />
              <div className="absolute bottom-0 right-0">
                <EditButton
                  onClick={() => {
                    dispatch(setSelectedPartner(partner));
                  }}
                />
                <DeleteDrawer
                  title={`Delete Partner`}
                  description={`Are you sure you want to delete this partner? This action cannot be undone.`}
                  onDelete={() => deletePartner(partner.id, partner.image)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
