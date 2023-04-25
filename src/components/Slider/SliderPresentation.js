import React from 'react'
import PropTypes from 'prop-types'

import getIcon from 'common/utils/getIcon'

function SliderPresentation({
  children,
  handlePrev,
  handleNext,
  slideProps,
  containerRef,
  hasNext,
  hasPrev,
}) {
  return (
    <div
      id="SliderWrapper"
      className="relative py-2 lg:py-6 overflow-x-auto lg:overflow-hidden"
    >
      <div id="Slider" className="flex relative group" ref={containerRef}>
        <div
          id="SliderContainer"
          className="flex px-2 transition-transform duration-300 delay-100 z-3 w-full"
          {...slideProps}
        >
          {children}
        </div>
      </div>
      {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
      {hasNext && <SlideButton onClick={handleNext} type="next" />}
    </div>
  )
}

function SlideButton({ onClick, type }) {
  return (
    <button
      type="button"
      className={`hidden lg:block absolute top-0 bottom-0 w-14  bg-black bg-opacity-50 my-28 z-4 transform ${
        type === 'prev' ? 'left-0' : 'right-0'
      }`}
      onClick={onClick}
    >
      <span className="w-10 text-white block mx-auto">
        {getIcon(
          `${type === 'prev' ? 'ChevronLeft' : 'ChevronRight'}`,
          'fill-current h-full w-auto',
        )}
      </span>
    </button>
  )
}

// PROPTYPES
const { bool, func, node, object, string } = PropTypes

SlideButton.propTypes = {
  onClick: func,
  type: string,
}
SliderPresentation.propTypes = {
  children: node,
  handlePrev: func,
  handleNext: func,
  slideProps: object,
  containerRef: object,
  hasNext: bool,
  hasPrev: bool,
}

export default SliderPresentation
