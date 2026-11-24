import React from 'react'
import { Route, Routes, useLocation } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import PageTabs from 'components/PageTabs'
import DashboardJoinList from 'components/DashboardJoinList'
import Memberships from 'components/Memberships'
import { useSiteStore } from 'context/SiteContext'

function DashboardMembershipContainer() {
  const { site } = useSiteStore()
  const headerContent = {
    title: 'Member Management',
    subtitle:
      'Manage members of your site and provide access for team members to different functionality based on their designated roles.',
    icon: 'Members',
  }

  const { pathname } = useLocation()

  return (
    <div id="DashboardMembershipContainer">
      <DashboardLanding.Presentation headerContent={headerContent} site={site}>
        <div className="bg-white rounded-lg shadow-sm">
          <PageTabs
            tabs={[
              {
                label: 'Current members',
                href: `/${site?.sitename}/dashboard/memberships`,
                current: pathname?.endsWith('/memberships'),
              },
              {
                label: 'Join requests',
                href: `/${site?.sitename}/dashboard/memberships/requests`,
                current: pathname?.includes('/requests'),
              },
              {
                label: 'Learn about member roles',
                href: `/${site?.sitename}/dashboard/memberships/information`,
                current: pathname?.includes('/information'),
              },
            ]}
          />
          <Routes>
            <Route path="" element={<Memberships.Container />} />
            <Route path="requests" element={<DashboardJoinList.Container />} />
          </Routes>
        </div>
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardMembershipContainer
