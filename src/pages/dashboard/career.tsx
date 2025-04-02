import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";
import { fetchCareer } from "@/redux/features/career-slice";
import CareerForm from "@/components/admin/career/form";

export default function CareerPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchCareer(controller));
    // dispatch partner
    return () => controller.abort();
  }, []); //eslint-disable-line
  return (
    <div>
      <CareerForm />
    </div>
  );
}

CareerPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
