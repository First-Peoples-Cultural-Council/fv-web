import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchSiteForm from 'components/SearchSiteForm'
import { getMediaUrl } from 'common/utils/urlHelpers'
import LazyImage from 'components/LazyImage'

function HomePresentation({ backgroundId, backgroundType, site }) {
  const bgSrc = getMediaUrl({ id: backgroundId, type: backgroundType })
  function getContents(type) {
    switch (type) {
      case 'gifOrImg':
        return (
          <div>
            <div
              id="HomeBannerWithImage"
              className="hidden md:flex justify-center"
            >
              <LazyImage
                imgStyling="z-0 w-auto h-auto min-w-full min-h-full max-h-1/2-screen xl:max-h-3/4-screen max-w-none"
                width={1920}
                forceLoad
                id={backgroundId}
              />
            </div>
            <div className="z-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-word to-word-dark">
              <div className="flex flex-col md:flex-row items-center justify-center mx-auto p-3 md:p-5">
                <div className="w-24 sm:w-32 lg:w-40 xl:w-48 md:-mt-24 lg:-mt-32 xl:-mt-44 flex flex-col items-center justify-center mr-4">
                  <div className="flex flex-col w-full mb-2">
                    <LazyImage
                      imgStyling="z-30 h-auto w-full rounded-full"
                      height={175}
                      width={175}
                      bgColor="none"
                      id={site?.logoId}
                    />
                  </div>
                  <div className="hidden md:block text-white text-2xl">
                    {site?.title}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full md:w-2/3">
                  <div className="w-11/12 md:w-5/6 xl:w-3/4">
                    <SearchSiteForm.Container />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'video':
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
              <div className="flex flex-col md:flex-row items-center justify-center mx-auto p-3 md:p-5">
                <div className="w-24 sm:w-32 lg:w-40 xl:w-48 flex flex-col items-center justify-center mr-4">
                  <div className="flex w-full mb-2">
                    <LazyImage
                      imgStyling="z-30 h-auto w-full rounded-full"
                      height={175}
                      width={175}
                      bgColor="none"
                      id={site?.logoId}
                    />
                  </div>
                  <div className="hidden md:block text-white text-2xl">
                    {site?.title}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full md:w-2/3">
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
            <div className="flex flex-col md:flex-row items-center justify-center mx-auto max-w-7xl p-3 md:p-5">
              <div className="w-48 flex flex-col items-center justify-center">
                <div className="flex mb-2">
                  <LazyImage
                    imgStyling="h-auto w-24 sm:w-32 lg:w-40 rounded-full"
                    height={175}
                    width={175}
                    bgColor="none"
                    id={site?.logoId}
                  />
                </div>
                <div className="hidden md:block text-white text-2xl text-center">
                  {site?.title}
                </div>
              </div>
              <div className="flex items-center justify-center w-full md:w-2/3 xl:w-3/4 md:h-24">
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
      className="bg-gradient-to-r from-gray-600 to-gray-700 min-h-96"
    >
      <div>{site?.title ? getContents(backgroundType) : null}</div>
    </section>
  )
}
// PROPTYPES
const { object, string } = PropTypes
HomePresentation.propTypes = {
  backgroundId: string,
  backgroundType: string,
  site: object,
}

export default HomePresentation
