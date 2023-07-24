import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import useMediaObject from 'common/dataHooks/useMediaObject'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, MEDIUM } from 'common/constants'

function ImgFromIdContainer(props) {
  const { id, size, alt, className, ...other } = props

  const { sitename } = useParams()

  const imageObject = useMediaObject({
    sitename,
    id,
    type: IMAGE,
  })

  const src = getMediaPath({
    mediaObject: imageObject,
    type: IMAGE,
    size: MEDIUM,
  })

  return (
    <img
      src={src}
      alt={alt || imageObject?.title}
      className={className}
      {...other}
    />
  )
}

// PROPTYPES
const { string } = PropTypes
ImgFromIdContainer.propTypes = {
  id: string,
  size: string,
  alt: string,
  className: string,
}

ImgFromIdContainer.defaultProps = {
  size: MEDIUM,
  className: 'w-full h-full object-contain',
}

export default ImgFromIdContainer
