import Head from "next/head";
import React from "react";

export default function HeadTags({
  currentMetaTag,
}: {
  currentMetaTag: Seo | undefined;
}) {
  return (
    <Head>
      <title>{currentMetaTag?.title}</title>
      <meta name="description" content={currentMetaTag?.description} />
    </Head>
  );
}
