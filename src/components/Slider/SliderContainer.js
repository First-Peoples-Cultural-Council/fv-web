import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import SliderData from 'components/Slider/SliderData'
import SliderPresentation from 'components/Slider/SliderPresentation'
import SliderPresentationTile from 'components/Slider/SliderPresentationTile'
import TopicsPresentationTopic from 'components/Topics/TopicsPresentationTopic'
import SliderPresentationExpandedContent from './SliderPresentationExpandedContent'

function SliderContainer({ items, topics }) {
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
    tileRef,
  } = SliderData({ items })
  const [currentSlide, setCurrentSlide] = useState()
  const handleSelect = (_item) => {
    setCurrentSlide(_item)
  }

  const handleClose = () => {
    setCurrentSlide(null)
  }
  return (
    <div>
      <SliderPresentation
        handlePrev={handlePrev}
        handleNext={handleNext}
        slideProps={slideProps}
        containerRef={containerRef}
        hasNext={hasNext}
        hasPrev={hasPrev}
      >
        {items.map((item) =>
          topics ? (
            <TopicsPresentationTopic
              key={item.id}
              currentSlide={currentSlide}
              tileRef={tileRef}
              topic={item}
              onTileClick={handleSelect}
            />
          ) : (
            <SliderPresentationTile
              key={item.id}
              currentSlide={currentSlide}
              tileRef={tileRef}
              item={item}
              onTileClick={handleSelect}
            />
          ),
        )}
      </SliderPresentation>
      {currentSlide && (
        <SliderPresentationExpandedContent
          item={currentSlide}
          onCloseExpandedContent={handleClose}
        />
      )}
    </div>
  )
}

// PROPTYPES
const { array, bool } = PropTypes
SliderContainer.propTypes = {
  items: array,
  topics: bool,
}

export default SliderContainer
