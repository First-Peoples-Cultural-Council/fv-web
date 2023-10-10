import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import DashboardPresentationSiteSelect from 'components/Dashboard/DashboardPresentationSiteSelect'
import getIcon from 'common/utils/getIcon'
import RequireAuth from 'common/RequireAuth'
import { ASSISTANT, MEMBER, EDITOR } from 'common/constants/roles'

function DashboardPresentation({ children, currentUser, site }) {
  return (
    <div data-testid="DashboardPresentation">
      {/* Sidebar */}
      <div className="flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-fv-charcoal">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              {getIcon('FVLogo', 'fill-current text-white h-8 w-auto')}
            </div>

            <nav className="flex-1">
              <DashboardPresentationSiteSelect
                sites={currentUser?.sites}
                site={site}
              />
              <div className="flex-1 divide-y divide-fv-charcoal-light space-y-2">
                {primaryNavigationItems(site?.sitename)}
                {secondaryNavigationItems(currentUser?.sites)}
              </div>
            </nav>
          </div>
          {userProfile(currentUser)}
        </div>
      </div>
      <div className="bg-gray-200 pl-64 flex flex-col min-h-screen">
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
      href: 'create',
      icon: 'Create',
      auth: ASSISTANT,
    },
    {
      name: 'Edit',
      href: 'edit',
      icon: 'Pencil',
      auth: EDITOR,
    },
    {
      name: 'Media',
      href: 'media',
      icon: 'Microphone',
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
              to={item.href}
              className={`group flex items-center p-2 text-sm font-medium rounded-lg ${
                match
                  ? 'bg-fv-charcoal-dark text-white'
                  : 'text-gray-300 hover:bg-fv-charcoal-light hover:text-white'
              }`}
            >
              {getIcon(
                item.icon,
                'text-gray-400 fill-current group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6',
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
        className="group flex items-center p-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-fv-charcoal-light hover:text-white"
        target="_blank"
        rel="noreferrer noopener"
      >
        {getIcon(
          'QuestionCircleSolid',
          'text-gray-400 fill-current group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6',
        )}
        Support
      </a>
      {secondaryNavigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="group flex items-center p-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-fv-charcoal-light hover:text-white"
        >
          {getIcon(
            item.icon,
            'text-gray-400 fill-current group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6',
          )}
          {item.name}
        </Link>
      ))}
    </div>
  )
}

const userProfile = (user) => (
  <div className="flex-shrink-0 flex bg-fv-charcoal-light p-4">
    <Link to="profile" className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div className="inline-flex">
          <div className="inline-block text-left">
            <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-xl rounded-full h-12 w-12 items-center justify-center">
              {user?.userInitials}
            </div>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">{user?.fullName}</p>
          <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
            View profile
          </p>
        </div>
      </div>
    </Link>
  </div>
)

// PROPTYPES
const { node, object } = PropTypes
DashboardPresentation.propTypes = {
  children: node,
  currentUser: object,
  site: object,
}

export default DashboardPresentation
