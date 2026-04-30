import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardTile from 'components/DashboardTile'
import RequireAuth from 'common/RequireAuth'
import { MEMBER } from 'common/constants/roles'

function DashboardTilesPresentation({ tileContent }) {
  const tileCount = tileContent.length
  const rowSize = Math.min(tileCount, 4)

  const gridClass = () =>
    tileCount === 1
      ? 'max-w-lg rounded-lg bg-charcoal-100 overflow-hidden shadow-sm'
      : `divide-x divide-charcoal-100 grid grid-cols-${rowSize} gap-px rounded-lg bg-charcoal-100 overflow-hidden shadow-sm`
  return (
    <section id="DashboardTilesPresentation">
      <div className={gridClass()}>
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {tileContent.map((tile) => (
          <RequireAuth
            key={tile?.id}
            siteMembership={tile?.auth ? tile?.auth : MEMBER}
          >
            <DashboardTile.Presentation tile={tile} />
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
