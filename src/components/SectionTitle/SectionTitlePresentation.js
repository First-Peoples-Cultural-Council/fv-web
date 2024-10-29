import React from 'react'
import PropTypes from 'prop-types'

function SectionTitlePresentation({
  accentColor = 'blumine-800',
  bgColor = 'white',
  title,
  placeholder = false,
}) {
  return (
    <div data-testid="SectionTitlePresentation" className="relative">
      <h2
        className={`relative z-10 text-center text-2xl md:text-4xl lg:text-5xl text-${accentColor} font-bold`}
      >
        <span
          className={`max-w-screen-lg inline-block px-4 sm:px-8 md:px-12 lg:px-16 bg-${bgColor}`}
        >
          {title}
          {placeholder && (
            <span className="bg-charcoal-50 text-charcoal-50 px-28" />
          )}
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
const { string, bool } = PropTypes
SectionTitlePresentation.propTypes = {
  accentColor: string,
  bgColor: string,
  title: string,
  placeholder: bool,
}

export default SectionTitlePresentation
