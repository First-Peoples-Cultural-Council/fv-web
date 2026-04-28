import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'

function DashboardTilePresentation({ tile }) {
  return (
    <div
      id="DashboardTilePresentation"
      data-testid={`dashboard-tile-${tile.id}`}
      className="relative group bg-white p-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blumine-600"
    >
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
              className="focus:outline-hidden"
              target="_blank"
              rel="noreferrer noopener"
            >
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              {tile.name}
            </a>
          ) : (
            <Link to={tile.href} className="focus:outline-hidden">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              {tile.name}
            </Link>
          )}
        </h3>
        <p className="mt-2 text-sm text-charcoal-500">{tile.description}</p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-charcoal-200 group-hover:text-charcoal-500"
        aria-hidden="true"
      >
        {getIcon('GoTo', 'size-6 fill-current')}
      </span>
    </div>
  )
}
// PROPTYPES
const { shape, string } = PropTypes
DashboardTilePresentation.propTypes = {
  tile: shape({
    id: string,
    name: string,
    description: string,
    href: string,
    icon: string,
    iconColor: string,
  }),
}

export default DashboardTilePresentation
