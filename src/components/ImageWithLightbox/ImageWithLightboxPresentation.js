import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import { IMAGE, MEDIUM, SMALL } from 'common/constants'

function ImageWithLightboxPresentation({
  image,
  imgStyling = 'h-auto w-full object-cover object-center',
  withIcon = false,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative group flex"
      >
        <img
          className={imgStyling}
          src={getMediaPath({
            mediaObject: image,
            type: IMAGE,
            size: SMALL,
          })}
          alt={image?.title}
        />

        {withIcon &&
          getIcon(
            'InfoCircleSolid',
            'absolute bottom-2 right-2 p-1 w-6 h-6 text-white fill-current opacity-60 group-hover:opacity-100',
          )}
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
              size: MEDIUM,
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
const { bool, object, string } = PropTypes
ImageWithLightboxPresentation.propTypes = {
  imgStyling: string,
  image: object,
  withIcon: bool,
}

export default ImageWithLightboxPresentation
