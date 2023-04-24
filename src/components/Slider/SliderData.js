import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function SliderData({ items }) {
  const TILEMARGIN = 16

  const tileRef = useRef()
  const containerRef = useRef()

  const [tileWidth, setTileWidth] = useState(0)
  const [slideDistance, setSlideDistance] = useState(0)
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0)

  useEffect(() => {
    setTileWidth(tileRef?.current?.clientWidth + TILEMARGIN)
  }, [tileRef?.current])

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth
    if (containerWidth > 0 && tileWidth > 0) {
      setTotalInViewport(Math.floor(containerWidth / tileWidth))
      setViewed(totalInViewport)
    }
  }, [containerRef.current?.clientWidth])

  const handlePrev = () => {
    setViewed(viewed - totalInViewport)
    setSlideDistance(slideDistance + totalInViewport * tileWidth)
  }

  const handleNext = () => {
    setViewed(viewed + totalInViewport)
    setSlideDistance(slideDistance - totalInViewport * tileWidth)
  }

  const slideProps = {
    style: { transform: `translate3d(${slideDistance}px, 0, 0)` },
  }

  const hasPrev = slideDistance < 0
  const hasNext = viewed + totalInViewport <= items?.length

  return {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
    tileRef,
  }
}

// PROPTYPES
const { array } = PropTypes
SliderData.propTypes = {
  items: array,
}

export default SliderData
