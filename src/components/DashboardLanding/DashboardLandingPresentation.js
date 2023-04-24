import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardTiles from 'components/DashboardTiles'
import getIcon from 'common/getIcon'
import { getMediaUrl } from 'common/urlHelpers'
import DashboardFooter from 'components/DashboardFooter'

function DashboardLandingPresentation({ children, headerContent, site, tileContent }) {
  const iconColor = headerContent?.iconColor || 'secondary'
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main id="DashboardLandingPresentation" className="space-y-5">
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
                  <p className={`text-xl font-bold text-${iconColor} sm:text-2xl`}>{headerContent?.title}</p>
                  <p className="text-sm font-medium text-fv-charcoal-light">{headerContent?.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <div className="pt-1 text-right">
                  <p className="text-xl font-bold text-fv-charcoal">You are on:</p>
                  <p className="text-xl font-medium text-fv-charcoal-light">{site?.title}</p>
                </div>
                <div className="flex-shrink-0">
                  {site?.logoId ? (
                    <img
                      className="flex max-w-xs bg-gray-300 rounded-full h-20 w-20 items-center justify-center"
                      src={getMediaUrl({
                        type: 'image',
                        id: site?.logoId,
                        viewName: 'Thumbnail',
                      })}
                      alt={`${site?.title} Logo`}
                    />
                  ) : (
                    <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
                      <span className="text-center">{site?.title?.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {tileContent?.length > 0 && (
          <div className="mx-auto max-w-7xl px-8">
            <DashboardTiles.Presentation tileContent={tileContent} />
          </div>
        )}
        {children}
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
