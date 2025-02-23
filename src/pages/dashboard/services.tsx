import ServicesForm from "@/components/admin/services/service-form";
import UploadedServices from "@/components/admin/services/services";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchService, setSelectedService } from "@/redux/features/service-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function Services() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchService(controller));
    return () => {
      dispatch(setSelectedService(null));
      controller.abort();
    };
  }, []); //eslint-disable-line
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <ServicesForm />
      </div>
      <div>
        {/* show uploaded images */}
        <UploadedServices />
      </div>
    </div>
  );
}

Services.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
