import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/getIcon'
import RequireAuth from 'common/RequireAuth'

function DashboardTilesPresentation({ tileContent }) {
  const tileClass = (index) => {
    const baseClass =
      'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary'
    if (tileContent?.length === 1) {
      return baseClass + ' rounded-lg'
    }
    if (
      (tileContent.length % 3 === 0 && index === 1) ||
      (tileContent.length % 3 === 0 && index === tileContent.length - 2)
    ) {
      return baseClass
    }
    if (index === tileContent.length - 2) {
      return baseClass + ' rounded-bl-lg'
    }
    if (index === tileContent.length - 1) {
      return baseClass + ' rounded-br-lg'
    }
    if (index === 0) {
      return baseClass + ' rounded-tl-lg'
    }
    if (index === 1) {
      return baseClass + ' rounded-tr-lg'
    }
    return baseClass
  }

  const gridClass = () => {
    const numberOfTiles = tileContent?.length
    switch (numberOfTiles) {
      case 1:
        return 'max-w-lg rounded-lg bg-gray-200 overflow-hidden shadow'
      case 3:
      case 6:
      case 9:
      case 12:
        return 'divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px rounded-lg bg-gray-200 overflow-hidden shadow'
      default:
        return 'divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px rounded-lg bg-gray-200 overflow-hidden shadow'
    }
  }
  return (
    <section id="DashboardTilesPresentation">
      <div className={gridClass()}>
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {tileContent.map((tile, actionIdx) => (
          <RequireAuth key={tile.name} role={tile?.auth ? tile?.auth : 'Member'}>
            <div key={tile.name} className={tileClass(actionIdx)}>
              <div>
                <span className={`text-${tile.iconColor} rounded-lg inline-flex ring-4 ring-white`}>
                  {getIcon(tile.icon, 'h-12 w-12 fill-current')}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  {tile?.externalLink ? (
                    <a href={tile.href} className="focus:outline-none" target="_blank" rel="noreferrer noopener">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tile.name}
                    </a>
                  ) : (
                    <Link to={tile.href} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tile.name}
                    </Link>
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{tile.description}</p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          </RequireAuth>
        ))}
      </div>
    </section>
  )
}
// PROPTYPES
const { array } = PropTypes
DashboardTilesPresentation.propTypes = {
  tileContent: array,
}

export default DashboardTilesPresentation
