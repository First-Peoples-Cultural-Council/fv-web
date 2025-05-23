import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import RequireAuth from 'common/RequireAuth'
import { MEMBER } from 'common/constants/roles'

function DashboardTilesPresentation({ tileContent }) {
  const tileCount = tileContent.length
  const rowSize = Math.min(tileCount, 4)
  const topLeft = 0
  const topRight = Math.min(rowSize - 1, tileCount - 1)
  const bottomLeft = Math.floor(tileCount / rowSize - 1 / rowSize) * rowSize
  const bottomRight = tileCount - 1

  const tileClass = (index) => {
    const baseClass =
      'relative group bg-white p-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-scarlet-800'

    let tileStyle = baseClass
    if (index === topLeft) {
      tileStyle += ' rounded-tl-lg'
    }
    if (index === topRight) {
      tileStyle += ' rounded-tr-lg'
    }
    if (index === bottomLeft) {
      tileStyle += ' rounded-bl-lg'
    }
    if (index === bottomRight) {
      tileStyle += ' rounded-br-lg'
    }

    return tileStyle
  }

  const gridClass = () =>
    tileCount === 1
      ? 'max-w-lg rounded-lg bg-charcoal-100 overflow-hidden shadow'
      : `divide-y divide-charcoal-100 divide-y-0 grid grid-cols-${rowSize} gap-px rounded-lg bg-charcoal-100 overflow-hidden shadow`
  return (
    <section id="DashboardTilesPresentation">
      <div className={gridClass()}>
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {tileContent.map((tile, actionIdx) => (
          <RequireAuth
            key={tile.name}
            siteMembership={tile?.auth ? tile?.auth : MEMBER}
          >
            <div key={tile.name} className={tileClass(actionIdx)}>
              <div>
                <span
                  className={`text-${tile.iconColor} rounded-lg inline-flex ring-4 ring-white`}
                >
                  {getIcon(tile.icon, 'h-12 w-12 fill-current')}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  {tile?.externalLink ? (
                    <a
                      href={tile.href}
                      className="focus:outline-none"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
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
                <p className="mt-2 text-sm text-charcoal-500">
                  {tile.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-charcoal-200 group-hover:text-charcoal-500"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
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
