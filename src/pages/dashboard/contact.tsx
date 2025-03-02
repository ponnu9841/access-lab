import ContactForm from "@/components/admin/contact/form";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { fetchContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function ContactPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchContact(controller));
    // dispatch partner
    return () => controller.abort();
  }, []); //eslint-disable-line

  return <ContactForm />;
}

ContactPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
