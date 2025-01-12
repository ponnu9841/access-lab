import DashBoardLayout from '@/components/layout/dashboard/dashboard-layout';
import React from 'react'

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return <DashBoardLayout>{page}</DashBoardLayout>;
};