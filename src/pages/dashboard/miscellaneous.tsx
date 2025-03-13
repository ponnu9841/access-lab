import GrievanceOfficer from "@/components/admin/grievance-officer";
import Headings from "@/components/admin/headings";
import PagesBanner from "@/components/admin/page-banner";
import Policies from "@/components/admin/policies";
import Seo from "@/components/admin/seo";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchGrievanceOfficer } from "@/redux/features/grievance-officer-slice";
import { fetchHeading } from "@/redux/features/heading-slice";
import { fetchPagesBanner } from "@/redux/features/pages-banner-slice";
import { fetchPolicy } from "@/redux/features/policy-slice";
import { fetchSeo } from "@/redux/features/seo-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useEffect } from "react";

export default function OthersPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchHeading(controller));
    dispatch(fetchPagesBanner(controller));
    dispatch(fetchSeo(controller));
    dispatch(fetchPolicy(controller));
    dispatch(fetchGrievanceOfficer(controller));
    return () => controller.abort();
  }, []); //eslint-disable-line
  return (
    <Tabs defaultValue="headings" className="w-full">
      <TabsList>
        <TabsTrigger value="headings">Headings</TabsTrigger>
        <TabsTrigger value="banner">Pages Banner</TabsTrigger>
        <TabsTrigger value="seo">Seo Meta Tags</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
        <TabsTrigger value="officer">Grievance Officer</TabsTrigger>
      </TabsList>
      <TabsContent value="headings">
        <Headings />
      </TabsContent>
      <TabsContent value="banner">
        <PagesBanner />
      </TabsContent>
      <TabsContent value="seo">
        <Seo />
      </TabsContent>
      <TabsContent value="policies">
        <Policies />
      </TabsContent>
      <TabsContent value="officer">
        <GrievanceOfficer />
      </TabsContent>
    </Tabs>
  );
}

OthersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};
