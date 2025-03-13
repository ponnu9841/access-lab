import Layout from '@/components/layout';
import React from 'react'

export default function FaqPage() {
  return (
    <div>FaqPage</div>
  )
}

FaqPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
