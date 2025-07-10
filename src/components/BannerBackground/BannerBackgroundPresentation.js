import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { ORIGINAL, IMAGE, VIDEO } from 'common/constants'

function BannerBackgroundPresentation({
  children,
  bannerImage,
  bannerVideo,
  bgColor = 'bg-jade-500',
}) {
  let bannerType = null
  let bannerMedia = null

  if (bannerImage) {
    bannerType = IMAGE
    bannerMedia = bannerImage
  } else if (bannerVideo) {
    bannerType = VIDEO
    bannerMedia = bannerVideo
  }

  const bgSrc = getMediaPath({
    mediaObject: bannerMedia,
    type: bannerType,
    size: ORIGINAL,
  })

  switch (bannerType) {
    case IMAGE:
      return (
        <div
          id="BannerWithImage"
          className="flex justify-center items-center md:h-96 overflow-hidden bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgSrc})` }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 backdrop-brightness-65">
            {children}
          </div>
        </div>
      )
    case VIDEO:
      return (
        <div
          id="BannerWithVideo"
          className="flex justify-center items-center md:h-96 overflow-hidden relative"
        >
          <video
            className="flex absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
            autoPlay
            muted
            loop
            src={bgSrc}
          />

          <div className="w-full z-20 px-4 sm:px-6 lg:px-8 backdrop-brightness-65">
            {children}
          </div>
        </div>
      )
    default:
      return (
        <div id="BannerNoMedia" className="flex justify-center items-center">
          <div className={`w-full px-4 sm:px-6 lg:px-8 ${bgColor}`}>
            {children}
          </div>
        </div>
      )
  }
}
// PROPTYPES
const { node, object, string } = PropTypes
BannerBackgroundPresentation.propTypes = {
  children: node,
  bannerImage: object,
  bannerVideo: object,
  bgColor: string,
}

export default BannerBackgroundPresentation
