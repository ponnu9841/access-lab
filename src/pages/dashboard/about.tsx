import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import AboutForm from "@/components/admin/about/form";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";
import { fetchAbout } from "@/redux/features/about-slice";

export default function AboutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchAbout(controller));
    // dispatch partner
    return () => controller.abort();
  }, []);
  return (
    <div>
      <AboutForm />
    </div>
  );
}

AboutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
