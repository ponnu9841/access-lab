import Layout from "@/components/layout";
import Policies from "@/components/policies";
import { getPoliciesResponse } from "@/lib/getData";
import React from "react";

export default function TermsConditionsPage(props: PrivacyPolicyPageProps) {
  const { policies } = props;
  return <Policies policies={policies} type="terms_conditions" />;
}

TermsConditionsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  try {
    const policies = await getPoliciesResponse();

    return {
      props: {
        policies: policies,
      },
      revalidate: process.env.REVALIDATE_TIME
        ? +process.env.REVALIDATE_TIME
        : 0,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Handle the error appropriately, e.g., redirect to an error page
    return {
      props: {
        error: "Error fetching Data",
      },
    };
  }
}
