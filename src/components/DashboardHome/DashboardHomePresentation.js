import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import RequireAuth from 'common/RequireAuth'
import { MEMBER } from 'common/constants/roles'
import DashboardLocator from 'components/DashboardLocator'

function DashboardHomePresentation({ site, tiles, currentUser }) {
  return (
    <main id="DashboardHome">
      <div className="mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="sr-only">Dashboard Landing Page</h1>

        <section className="mb-6">
          <div className="rounded-lg bg-white overflow-hidden shadow">
            <h2 className="sr-only" id="profile-overview-title">
              Dashboard Overview
            </h2>
            <div className="bg-white p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex space-x-5">
                  <div className="flex-shrink-0">
                    <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
                      {currentUser?.userInitials}
                    </div>
                  </div>
                  <div className="pt-1 text-left">
                    <p className="text-sm font-medium text-fv-charcoal-light">
                      Welcome back,
                    </p>
                    <p className="font-bold text-fv-charcoal text-2xl">
                      {currentUser.fullName}
                    </p>
                    <p className="text-sm font-medium text-fv-charcoal-light">
                      {currentUser.role}
                    </p>
                  </div>
                </div>
                <DashboardLocator.Presentation site={site} />
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-3xl">
          <h2 className="text-sm font-medium text-gray-500">Quick Links</h2>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {tiles.map((tile) => (
              <RequireAuth
                key={tile.name}
                siteMembership={tile?.auth ? tile?.auth : MEMBER}
              >
                <li
                  key={tile?.name}
                  className="relative group col-span-1 flex rounded-md shadow-lg"
                >
                  <div
                    className={`bg-gray-100 text-${tile.iconColor} flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium`}
                  >
                    {getIcon(tile.icon, 'h-8 w-8 fill-current')}
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      {tile?.externalLink ? (
                        <a
                          href={tile?.href}
                          className="text-lg font-medium text-fv-charcoal group-hover:text-gray-600"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {tile?.name}
                        </a>
                      ) : (
                        <Link
                          to={tile?.href}
                          className="text-lg font-medium text-fv-charcoal group-hover:text-gray-600"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {tile?.name}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              </RequireAuth>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
// PROPTYPES
const { array, object } = PropTypes
DashboardHomePresentation.propTypes = {
  currentUser: object,
  site: object,
  tiles: array,
}

export default DashboardHomePresentation
