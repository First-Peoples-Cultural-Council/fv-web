import React from 'react'
import PropTypes from 'prop-types'

function SectionTitlePresentation({
  accentColor = 'blumine-900',
  bgColor = 'white',
  title,
}) {
  return (
    <div data-testid="SectionTitlePresentation" className="relative">
      <h2
        className={`relative z-10 text-center text-2xl md:text-3xl lg:text-4xl text-${accentColor}`}
      >
        <span
          className={`max-w-sm md:max-w-2xl lg:max-w-5xl inline-block px-3 sm:px-5 md:px-7 lg:px-9 bg-${bgColor}`}
        >
          {title || <span className="bg-charcoal-50 px-28" />}
        </span>
      </h2>
      <hr
        className={`absolute z-0 w-full border-${accentColor}`}
        style={{ top: '50%' }}
      />
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
