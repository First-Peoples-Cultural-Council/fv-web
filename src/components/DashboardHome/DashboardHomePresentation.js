import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import RequireAuth from 'common/RequireAuth'
import { LANGUAGE_ADMIN, MEMBER } from 'common/constants/roles'
import DashboardLocator from 'components/DashboardLocator'
import DashboardJoinList from 'components/DashboardJoinList'

function DashboardHomePresentation({ site, tiles, currentUser }) {
  return (
    <main id="DashboardHome">
      <h1 className="sr-only">Dashboard Landing Page</h1>
      <div className="mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <section>
          <div className="rounded-lg bg-white overflow-hidden shadow-sm">
            <div className="bg-white p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex space-x-5">
                  <div className="shrink-0">
                    <div className="flex max-w-xs p-3 bg-scarlet-800 hover:bg-scarlet-900 text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
                      {currentUser?.userInitials}
                    </div>
                  </div>
                  <div className="pt-1 text-left">
                    <p className="text-sm font-medium text-charcoal-500">
                      Welcome back,
                    </p>
                    <p className="font-bold text-charcoal-900 text-2xl">
                      {currentUser.fullName}
                    </p>
                    <p className="text-sm font-medium text-charcoal-500">
                      {currentUser.role}
                    </p>
                  </div>
                </div>
                <DashboardLocator.Presentation site={site} />
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-3 mx-2 text-sm font-medium text-charcoal-500">
            Quick links
          </h2>
          <ul className="grid grid-cols-3 lg:grid-cols-4  gap-3">
            {tiles.map((tile) => (
              <RequireAuth
                key={tile.name}
                siteMembership={tile?.auth ? tile?.auth : MEMBER}
              >
                <li
                  key={tile?.name}
                  className="relative group col-span-1 flex rounded-lg"
                >
                  <div
                    className={`bg-charcoal-50 text-${tile?.iconColor} flex h-10 w-10 shrink-0 items-center justify-center rounded-l-md font-medium`}
                  >
                    {getIcon(tile.icon, 'h-6 w-6 fill-current')}
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-charcoal-100 bg-white">
                    <div className="flex-1 truncate p-1 ">
                      {tile?.externalLink ? (
                        <a
                          href={tile?.href}
                          className="text-sm font-medium text-charcoal-900 group-hover:text-charcoal-500"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0 capitalize"
                            aria-hidden="true"
                          />
                          {tile?.name}
                        </a>
                      ) : (
                        <Link
                          to={tile?.href}
                          className="text-sm font-medium text-charcoal-900 group-hover:text-charcoal-500"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0 capitalize"
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
        <RequireAuth siteMembership={LANGUAGE_ADMIN}>
          <section className="rounded-lg overflow-hidden">
            <h2 className="mb-3 mx-2 text-sm font-medium text-charcoal-500">
              Requests to join {site?.title}
            </h2>
            <DashboardJoinList.Container />
          </section>
        </RequireAuth>
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
