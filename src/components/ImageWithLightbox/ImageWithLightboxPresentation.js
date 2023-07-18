import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import LazyImage from 'components/LazyImage'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, ORIGINAL } from 'common/constants'

function ImageWithLightboxPresentation({ image, maxWidth, imgStyling }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  return (
    <>
      <LazyImage
        imgStyling={imgStyling}
        width={maxWidth}
        onClick={() => setLightboxOpen(true)}
        imageObject={image}
        label="i"
        forceLoad
        alt={image?.title}
      />
      {/* Lightbox Modal */}
      <Modal.Presentation
        isOpen={lightboxOpen}
        closeHandler={() => setLightboxOpen(false)}
      >
        <div
          id="ImageWithLightboxPresentation"
          className="inline-block text-white transform transition-all align-middle max-w-2xl lg:max-w-4xl xl:max-w-7xl"
        >
          <img
            className="object-contain sm:h-4/5-screen shadow-xl mx-auto"
            src={getMediaPath({
              mediaObject: image,
              type: IMAGE,
              size: ORIGINAL,
            })}
            alt={image?.title}
          />
          <div className="mt-1 text-lg md:text-xl font-medium">
            {image?.title}
          </div>
          {image?.description && (
            <div className="text-base">{image?.description}</div>
          )}
          {image?.acknowledgement && (
            <div className="text-sm">
              Acknowledgement: {image?.acknowledgement}
            </div>
          )}
        </div>
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { object, string, number } = PropTypes
ImageWithLightboxPresentation.propTypes = {
  maxWidth: number,
  imgStyling: string,
  image: object,
}

ImageWithLightboxPresentation.defaultProps = {
  maxWidth: 1920,
  imgStyling: 'h-auto w-full',
}

export default ImageWithLightboxPresentation
