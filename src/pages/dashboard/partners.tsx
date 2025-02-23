import PartnerForm from "@/components/admin/partner/form";
import PartnerImages from "@/components/admin/partner/partner-images";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchPartner, setSelectedPartner } from "@/redux/features/partner-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function Partners() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchPartner(controller));
    // dispatch partner
    return () => {
      controller.abort();
	  dispatch(setSelectedPartner(null));
    };
  }, []); //eslint-disable-line
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <PartnerForm />
      </div>
      <div>
        {/* show uploaded images */}
        <PartnerImages />
      </div>
    </div>
  );
}

Partners.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
