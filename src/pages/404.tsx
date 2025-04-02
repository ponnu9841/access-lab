import Layout from "@/components/layout";

export default function ErrorPage() {
  return (
    <div>BlogPage</div>
  )
}

ErrorPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
