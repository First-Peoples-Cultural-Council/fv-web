import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardTiles from 'components/DashboardTiles'
import DashboardLocator from 'components/DashboardLocator'

function DashboardHomePresentation({ site, tiles, currentUser, logout }) {
  return (
    <main id="DashboardHome">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
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
                <DashboardLocator.Presentation site={site} logout={logout} />
                {/* <div>
                      <button
                        type="button"
                        onClick={logout}
                        className="ml-5 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
                      >
                        LOGOUT
                      </button>
                    </div> */}
              </div>
            </div>
          </div>
        </section>
        <DashboardTiles.Presentation tileContent={tiles} />
      </div>
    </main>
  )
}
// PROPTYPES
const { array, object, func } = PropTypes
DashboardHomePresentation.propTypes = {
  currentUser: object,
  site: object,
  tiles: array,
  logout: func,
}

export default DashboardHomePresentation
