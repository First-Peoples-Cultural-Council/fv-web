import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import DashboardPresentationSiteSelect from 'components/Dashboard/DashboardPresentationSiteSelect'
import getIcon from 'common/utils/getIcon'
import RequireAuth from 'common/RequireAuth'
import { ASSISTANT, MEMBER } from 'common/constants/roles'

function DashboardPresentation({ children, currentUser, site, logout }) {
  const logoutButton = (
    <div className="px-2 py-4 space-y-1">
      <button
        data-testid="logout-btn"
        type="button"
        onClick={logout}
        className="group flex w-full items-center p-2 text-sm font-medium rounded-lg text-charcoal-200 hover:bg-charcoal-500 hover:text-white"
      >
        {getIcon(
          'LogOut',

          'text-charcoal-500 fill-current group-hover:text-charcoal-200 mr-4 flex-shrink-0 h-6 w-6',
        )}
        <span>Sign Out</span>
      </button>
    </div>
  )

  return (
    <div data-testid="DashboardPresentation">
      {/* Sidebar */}
      <div className="flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-charcoal-900 divide-y divide-charcoal-500 space-y-2">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Link to="/" className="flex items-center flex-shrink-0 m-4">
              <span className="sr-only">FirstVoices Logo</span>
              {getIcon('FVLogo', 'h-10 w-auto fill-current text-white')}
            </Link>

            <nav className="flex-1">
              <DashboardPresentationSiteSelect
                sites={currentUser?.teamMemberSites}
                site={site}
              />
              <div className="flex-1 divide-y divide-charcoal-500 space-y-2">
                {primaryNavigationItems(site?.sitename)}
                {secondaryNavigationItems(currentUser?.teamMemberSites)}
              </div>
            </nav>
          </div>
          <div>
            {logoutButton}
            {userProfile(currentUser)}
          </div>
        </div>
      </div>
      <div className="bg-charcoal-100 pl-64 flex flex-col min-h-screen">
        {/* Main Page content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

const primaryNavigationItems = (currentSitename) => {
  const navigation = [
    {
      name: 'Dashboard',
      href: `/${currentSitename}/dashboard`,
      icon: 'Dashboard',
      auth: MEMBER,
    },
    {
      name: 'Create',
      href: `/${currentSitename}/dashboard/create`,
      icon: 'Create',
      auth: ASSISTANT,
    },
    {
      name: 'Edit',
      href: `/${currentSitename}/dashboard/edit`,
      icon: 'Pencil',
      auth: ASSISTANT,
    },
    {
      name: 'Media',
      href: `/${currentSitename}/dashboard/media`,
      icon: 'Microphone',
      auth: ASSISTANT,
    },
    {
      name: 'Reports',
      href: `/${currentSitename}/dashboard/reports`,
      icon: 'Reports',
      auth: ASSISTANT,
    },
  ]
  return (
    <div className="pl-14 pr-2 pb-4 space-y-1">
      {navigation.map((item) => {
        const resolved = useResolvedPath(item.href)
        const match = useMatch({ path: resolved.pathname, end: true })
        return (
          <RequireAuth key={item.name} siteMembership={item.auth}>
            <Link
              data-testid={`DashboardPresentation${item.name}`}
              to={item.href}
              className={`group flex items-center p-2 text-sm font-medium rounded-lg ${
                match
                  ? 'bg-charcoal-900 text-white'
                  : 'text-charcoal-200 hover:bg-charcoal-500 hover:text-white'
              }`}
            >
              {getIcon(
                item.icon,
                'text-charcoal-500 fill-current group-hover:text-charcoal-200 mr-4 flex-shrink-0 h-6 w-6',
              )}
              {item.name}
            </Link>
          </RequireAuth>
        )
      })}
    </div>
  )
}

const secondaryNavigationItems = (sites) => {
  const secondaryNavigation = []
  if (sites?.length > 0) {
    sites.forEach((site) =>
      secondaryNavigation.push({
        name: `${site?.title} site`,
        href: `/${site?.sitename}`,
        icon: 'BackArrow',
      }),
    )
  }

  return (
    <div className="px-2 py-4 space-y-1">
      <a
        href="https://firstvoices.atlassian.net/servicedesk/customer/portals"
        className="group flex items-center p-2 text-sm font-medium rounded-lg text-charcoal-200 hover:bg-charcoal-500 hover:text-white"
        target="_blank"
        rel="noreferrer noopener"
      >
        {getIcon(
          'QuestionCircleSolid',
          'text-charcoal-500 fill-current group-hover:text-charcoal-200 mr-4 flex-shrink-0 h-6 w-6',
        )}
        Support
      </a>
      {secondaryNavigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="group flex items-center p-2 text-sm font-medium rounded-lg text-charcoal-200 hover:bg-charcoal-500 hover:text-white"
        >
          {getIcon(
            item.icon,
            'text-charcoal-500 fill-current group-hover:text-charcoal-200 mr-4 flex-shrink-0 h-6 w-6',
          )}
          {item.name}
        </Link>
      ))}
    </div>
  )
}

const userProfile = (user) => (
  <div className="flex-shrink-0 flex bg-charcoal-500 p-4">
    <div className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div className="inline-flex">
          <div className="inline-block text-left">
            <div className="flex max-w-xs p-3 bg-scarlet-800 hover:bg-scarlet-900 text-white text-xl rounded-full h-12 w-12 items-center justify-center">
              {user?.userInitials}
            </div>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">{user?.fullName}</p>
          <p className="text-xs font-medium text-charcoal-200 group-hover:text-charcoal-100"></p>
        </div>
      </div>
    </div>
  </div>
)

// PROPTYPES
const { node, object, func } = PropTypes
DashboardPresentation.propTypes = {
  children: node,
  currentUser: object,
  site: object,
  logout: func,
}

export default DashboardPresentation
