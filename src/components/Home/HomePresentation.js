import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import HomeSearchForm from 'components/HomeSearchForm'
import { getMediaPath } from 'common/utils/mediaHelpers'
import SiteLogo from 'components/SiteLogo'
import { ORIGINAL, IMAGE, VIDEO } from 'common/constants'

function HomePresentation({ bannerMedia, bannerType, site }) {
  const bgSrc = getMediaPath({
    mediaObject: bannerMedia,
    type: bannerType,
    size: ORIGINAL,
  })
  const logoTitleColumnStyling =
    'w-20 sm:w-28 md:w-40 lg:w-52 flex flex-col items-center justify-center'

  function BannerContents() {
    return (
      <div
        className={`w-full z-20 px-4 sm:px-6 lg:px-8 ${bannerType && 'backdrop-brightness-65'}`}
      >
        <div className="flex flex-col items-center justify-center md:h-96 md:flex-row p-3 md:p-5 md:space-x-4 mx-auto ">
          <div className={logoTitleColumnStyling}>
            <SiteLogo.Presentation
              additionalStyling={`${logoTitleColumnStyling} z-30 mb-2`}
            />
            <div className="hidden md:block w-full text-center text-2xl text-white">
              {site?.title}
            </div>
          </div>
          <div className="flex items-center justify-center w-full md:w-2/3">
            <div className="w-11/12 md:w-10/12 xl:w-4/5">
              <HomeSearchForm />
            </div>
          </div>
        </div>
      </div>
    )
  }

  switch (bannerType) {
    case IMAGE:
      return (
        <div
          id="HomeBannerWithImage"
          className={`flex justify-center items-center md:h-96 overflow-hidden bg-no-repeat bg-cover bg-center`}
          style={{ backgroundImage: `url(${bgSrc})` }}
        >
          <BannerContents />
        </div>
      )
    case VIDEO:
      return (
        <div
          id="HomeBannerWithVideo"
          className="flex justify-center relative items-center md:h-96 overflow-hidden"
        >
          <video
            className="flex absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
            autoPlay
            muted
            loop
            src={bgSrc}
          />
          <BannerContents />
        </div>
      )
    default:
      return (
        <div
          id="HomeBannerNoMedia"
          className="flex justify-center items-center bg-jade-500 md:h-96"
        >
          <BannerContents />
        </div>
      )
  }
}
// PROPTYPES
const { object, string } = PropTypes
HomePresentation.propTypes = {
  bannerMedia: object,
  bannerType: string,
  site: object,
}

export default HomePresentation
