import React from 'react'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardTiles from 'components/DashboardTiles'
import getIcon from 'common/utils/getIcon'
import DashboardFooter from 'components/DashboardFooter'
import DashboardLocator from 'components/DashboardLocator'

function DashboardLandingPresentation({
  children,
  headerContent,
  site,
  tileContent,
}) {
  const iconColor = headerContent?.iconColor || 'scarlet-800'
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main id="DashboardLandingPresentation" className="space-y-5">
        <SiteDocHead
          titleArray={[
            ((headerContent?.title || '').trim() || 'Entries').replace(
              /^(?!(edit|create|media)\b)/i,
              'Edit ',
            ),
          ]}
        />
        <div className="w-full bg-white shadow">
          <h1 className="sr-only">{headerContent?.title}</h1>
          <div className="mx-auto max-w-7xl px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="sm:flex sm:space-x-5 items-center">
                <div className="flex-shrink-0">
                  <div
                    className={`flex max-w-xs p-3 bg-${iconColor} text-white text-3xl rounded-full h-20 w-20 items-center justify-center`}
                  >
                    {getIcon(headerContent?.icon, 'fill-current h-12 w-12')}
                  </div>
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p
                    className={`text-xl font-bold text-${iconColor} sm:text-2xl`}
                  >
                    {headerContent?.title}
                  </p>
                  <p className="text-sm font-medium text-charcoal-500">
                    {headerContent?.subtitle}
                  </p>
                </div>
              </div>
              <DashboardLocator.Presentation site={site} />
            </div>
          </div>
        </div>
        {tileContent?.length > 0 && (
          <div className="mx-auto max-w-7xl px-8">
            <DashboardTiles.Presentation tileContent={tileContent} />
          </div>
        )}
        <div>{children}</div>
      </main>
      <DashboardFooter.Presentation />
    </div>
  )
}
// PROPTYPES
const { array, node, object } = PropTypes
DashboardLandingPresentation.propTypes = {
  children: node,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardLandingPresentation
