import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { THUMBNAIL } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function SiteCard({ site }) {
  return (
    <Link
      className="group relative card border-2 border-charcoal-100 rounded-l-lg shadow-md text-charcoal-900 hover:text-white flex items-center
        h-16 md:h-24 w-64 lg:w-72 m-5 md:ml-12 lg:ml-16 hover:bg-jade-500 hover:border-jade-500"
      to={`/${site?.sitename}`}
    >
      <div className="absolute h-16 w-16 md:w-24 md:h-24 -left-8 md:-left-12">
        <SiteLogo.Presentation
          size={THUMBNAIL}
          logo={site?.logo || null}
          additionalStyling="ring-1 ring-charcoal-100"
        />
      </div>
      <div className="w-10 md:w-14" />
      <div className="w-full px-2 tracking-tight text-center break-word">
        {site?.title}
      </div>
    </Link>
  )
}

// PROPTYPES
const { object } = PropTypes
SiteCard.propTypes = {
  site: object,
}
export default SiteCard
