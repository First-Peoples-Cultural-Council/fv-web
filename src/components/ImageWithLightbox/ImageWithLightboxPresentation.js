import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import LazyImage from 'components/LazyImage'

function ImageWithLightboxPresentation({ image, maxWidth, imgStyling }) {
  console.log({ image })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  return (
    <>
      <LazyImage
        imgStyling={imgStyling}
        width={maxWidth}
        onClick={() => setLightboxOpen(true)}
        id={image.uid || image.id}
        mimeType={image?.['mime-type']}
        label="i"
        forceLoad
        alt={`Gallery Image ${image?.['dc:title']}`}
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
          <LazyImage
            imgStyling="object-contain sm:h-4/5-screen shadow-xl mx-auto"
            width={1920}
            onClick={() => setLightboxOpen(true)}
            forceLoad
            id={image.uid || image.id}
            mimeType={image?.['mime-type']}
            alt={`Gallery Image ${image?.['dc:title']}`}
          />
          <div className="mt-1 text-lg md:text-xl font-medium">
            {image?.['dc:title']}
          </div>
          {image?.['dc:description'] && (
            <div className="text-base">{image?.['dc:description']}</div>
          )}
          {image?.speaker && (
            <div className="text-sm">Source: {image?.speaker}</div>
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
const { shape, string, number } = PropTypes
ImageWithLightboxPresentation.propTypes = {
  maxWidth: number,
  imgStyling: string,
  image: shape({
    uid: string,
    'dc:title': string,
    'dc:description': string,
    speaker: string,
    acknowledgement: string,
  }),
}

ImageWithLightboxPresentation.defaultProps = {
  maxWidth: 1920,
  imgStyling: 'h-auto w-full',
}

export default ImageWithLightboxPresentation
