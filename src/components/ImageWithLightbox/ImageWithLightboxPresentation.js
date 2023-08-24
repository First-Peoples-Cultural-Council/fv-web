import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, ORIGINAL, SMALL } from 'common/constants'

function ImageWithLightboxPresentation({ image, imgStyling }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  return (
    <>
      <img
        className={imgStyling}
        src={getMediaPath({
          mediaObject: image,
          type: IMAGE,
          size: SMALL,
        })}
        alt={image?.title}
      />
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="absolute border-2 z-10 bg-white w-6 h-6 text-sm flex items-center justify-center bottom-3 right-2 p-1 rounded-full"
      >
        i
      </button>
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
const { object, string } = PropTypes
ImageWithLightboxPresentation.propTypes = {
  imgStyling: string,
  image: object,
}

ImageWithLightboxPresentation.defaultProps = {
  imgStyling: 'h-auto w-full',
}

export default ImageWithLightboxPresentation
