import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardTiles from 'components/DashboardTiles'
import getIcon from 'common/utils/getIcon'
import DashboardLocator from 'components/DashboardLocator'

function DashboardHomePresentation({ site, tiles, currentUser }) {
  return (
    <main id="DashboardHome">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:max-w-7xl lg:p-8">
        <h1 className="sr-only">Profile</h1>
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {/* Welcome panel */}
            <section>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
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
                          {currentUser.displayName}
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
            {site?.features?.includes('version2') ? (
              ''
            ) : (
              <div className="bg-white p-6 rounded-lg space-y-2">
                <div className="text-primary rounded-lg inline-flex ring-4 ring-white">
                  {getIcon('InfoCircleSolid', 'h-12 w-12 fill-current')}
                </div>
                <div className=" text-fv-charcoal text-sm">
                  Editing in the new Dashboard has not been enabled for some
                  content on this site. For now, you can edit that content in
                  the old FirstVoices view, and it will be updated in the new
                  FirstVoices. To go to the old site click{' '}
                  <a
                    href={`https://www.firstvoices.com/explore${
                      site?.path || ''
                    }`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 visited:text-purple-600 underline"
                  >
                    here
                  </a>
                  .
                </div>
              </div>
            )}
            <DashboardTiles.Presentation tileContent={tiles} />
          </div>
        </div>
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
