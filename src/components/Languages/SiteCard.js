import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import placeholder from 'images/cover-thumbnail.png'

function SiteCard({ site }) {
  return (
    <Link
      className="group relative card border-2 border-gray-200 rounded-l-lg shadow-md text-fv-charcoal hover:text-white flex items-center
        h-16 md:h-24 w-64 lg:w-72 m-5 md:ml-12 lg:ml-16 hover:bg-word hover:border-word"
      to={`/${site?.sitename}`}
    >
      <img
        className="absolute h-16 w-16 md:w-24 md:h-24 rounded-full ring-1 ring-gray-200 -left-8 md:-left-10"
        src={site.logoPathSmall || placeholder}
        alt={`${site.title} - Logo`}
      />
      <p className="w-full ml-24 mr-8 md:mr-4 tracking-tight text-center break-word">
        {site.title}
      </p>
    </Link>
  )
}

// PROPTYPES
const { object } = PropTypes
SiteCard.propTypes = {
  site: object,
}
export default SiteCard
