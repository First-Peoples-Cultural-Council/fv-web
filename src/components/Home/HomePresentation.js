import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchSiteForm from 'components/SearchSiteForm'
import { getMediaPath } from 'common/utils/mediaHelpers'
import LazyImage from 'components/LazyImage'
import { ORIGINAL, IMAGE, VIDEO } from 'common/constants'

function HomePresentation({ bannerMedia, bannerType, site }) {
  const bgSrc = getMediaPath({
    mediaObject: bannerMedia,
    type: bannerType,
    size: ORIGINAL,
  })

  const logoWidth = 'w-24 sm:w-32  md:w-44 lg:w-60'
  const logoHeight = 'h-24 sm:h-32 md:h-44 lg:h-60'
  const logoPosition = 'items-center justify-center'
  const titleStyling = 'hidden md:block w-full text-center text-white text-2xl'

  function getContents(type) {
    switch (type) {
      case IMAGE:
        return (
          <div>
            <div
              id="HomeBannerWithImage"
              className="hidden md:flex justify-center"
            >
              <LazyImage
                imgStyling="z-0 h-80 lg:h-96 w-full"
                width={1280}
                height={320}
                imageObject={bannerMedia}
              />
            </div>
            <div className="z-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-word to-word-dark">
              <div
                className={`flex flex-col md:flex-row ${logoPosition} mx-auto p-3 md:p-5`}
              >
                <div
                  className={`${logoWidth} md:-mt-24 lg:-mt-44 flex flex-col ${logoPosition} mr-4`}
                >
                  <div className="flex flex-col w-full mb-2">
                    <LazyImage
                      imgStyling={`${logoHeight} ${logoWidth} rounded-full`}
                      height={175}
                      width={175}
                      bgColor="none"
                      imageObject={site?.logo}
                    />
                  </div>
                  <div className={titleStyling}>{site?.title}</div>
                </div>
                <div className={`flex ${logoPosition} w-full md:w-2/3`}>
                  <div className="w-11/12 md:w-5/6 xl:w-3/4">
                    <SearchSiteForm.Container />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case VIDEO:
        return (
          <div
            id="HomeBannerWithVideo"
            className="flex justify-center relative text-white bg-gradient-to-b from-word to-word-dark md:from-gray-300 md:to-gray-300 items-center md:h-96 overflow-hidden"
          >
            <video
              className="hidden md:flex absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
              autoPlay
              muted
              loop
              src={bgSrc}
            />
            <div className="w-full z-20 px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col md:flex-row ${logoPosition} mx-auto p-3 md:p-5`}
              >
                <div
                  className={`${logoWidth} flex flex-col ${logoPosition} mr-4`}
                >
                  <div className="flex w-full mb-2">
                    <LazyImage
                      imgStyling={`${logoHeight} ${logoWidth} z-30 rounded-full`}
                      height={175}
                      width={175}
                      bgColor="none"
                      imageObject={site?.logo}
                    />
                  </div>
                  <div className={titleStyling}>{site?.title}</div>
                </div>
                <div className={`flex ${logoPosition} w-full md:w-2/3`}>
                  <div className="w-11/12 md:w-5/6 xl:w-3/4">
                    <SearchSiteForm.Container />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div
            id="HomeBannerNoMedia"
            className="bg-gradient-to-b from-word to-word-dark"
          >
            <div
              className={`flex flex-col md:flex-row ${logoPosition} mx-auto max-w-7xl p-3 md:p-5`}
            >
              <div className={`${logoWidth} flex flex-col ${logoPosition}`}>
                <div className="flex mb-2">
                  <LazyImage
                    imgStyling={`${logoHeight} ${logoWidth} rounded-full`}
                    height={175}
                    width={175}
                    bgColor="none"
                    imageObject={site?.logo}
                  />
                </div>
                <div className={titleStyling}>{site?.title}</div>
              </div>
              <div
                className={`flex ${logoPosition} w-full md:w-2/3 xl:w-3/4 md:h-24`}
              >
                <div className="w-11/12 md:w-5/6 xl:w-3/4">
                  <SearchSiteForm.Container />
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section
      data-testid="HomePresentation"
      className="bg-gradient-to-r from-gray-600 to-gray-700 md:min-h-96"
    >
      <div>{site?.title ? getContents(bannerType) : null}</div>
    </section>
  )
}
// PROPTYPES
const { object, string } = PropTypes
HomePresentation.propTypes = {
  bannerMedia: object,
  bannerType: string,
  site: object,
}

export default HomePresentation
