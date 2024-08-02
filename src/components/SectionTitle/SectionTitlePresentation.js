import React from 'react'
import PropTypes from 'prop-types'

function SectionTitlePresentation({
  accentColor,
  bgColor = 'white',
  title,
  placeholder = false,
}) {
  return (
    <div data-testid="SectionTitlePresentation" className="relative">
      <h2
        className={`relative z-10 text-center text-2xl md:text-4xl lg:text-5xl text-${
          accentColor || 'primary'
        } font-bold`}
      >
        <span
          className={`inline-block px-4 sm:px-8 md:px-12 lg:px-20 bg-${bgColor}`}
        >
          {title}
          {placeholder && <span className="bg-gray-100 text-gray-100 px-28" />}
        </span>
      </h2>
      <hr
        className={`absolute z-0 w-full ${
          accentColor ? `border-${accentColor}` : 'border-primary'
        }`}
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
