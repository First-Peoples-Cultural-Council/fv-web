import React from 'react'
import PropTypes from 'prop-types'

function SectionTitlePresentation({
  accentColor = 'blumine-900',
  bgColor = 'white',
  title,
}) {
  return (
    <div data-testid="SectionTitlePresentation">
      <h2 className={`relative flex items-center text-center`}>
        <div className={`grow border-t border-${accentColor}`} />
        <span
          className={`shrink max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl px-3 sm:px-5 md:px-7 lg:px-9 bg-${bgColor} text-2xl md:text-3xl lg:text-4xl text-${accentColor}`}
        >
          {title || <span className="bg-charcoal-50 px-28" />}
        </span>
        <div className={`grow border-t border-${accentColor}`} />
      </h2>
    </div>
  )
}
// PROPTYPES
const { node, string } = PropTypes
SectionTitlePresentation.propTypes = {
  accentColor: string,
  bgColor: string,
  title: node,
}

export default SectionTitlePresentation
