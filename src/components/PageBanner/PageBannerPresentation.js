import React from 'react'
import PropTypes from 'prop-types'
import { getMediaUrl } from 'common/utils/urlHelpers'

function PageBannerPresentation({
  backgroundId,
  backgroundType,
  textNode,
  logoPath,
  variant,
  site,
}) {
  if (!backgroundId && !textNode && !logoPath) {
    return null
  }

  const containerStyles =
    backgroundType === 'gifOrImg'
      ? {
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0.47)), url(${getMediaUrl(
            {
              id: backgroundId,
              type: 'gifOrImg',
            },
          )})`,
        }
      : {}

  function getConditionalClass() {
    switch (backgroundType) {
      case 'gifOrImg':
        return 'text-white bg-no-repeat bg-cover bg-center py-6 md:py-16'
      case 'video':
        return 'text-white bg-gray-300 items-center h-72 md:h-96 overflow-hidden'
      default:
        return 'bg-gray-300 py-16'
    }
  }

  return (
    <section
      data-testid="PageBannerPresentation"
      className={`flex justify-center relative ${getConditionalClass()}`}
      style={containerStyles}
    >
      {backgroundType === 'video' && (
        <video
          className="absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
          autoPlay
          muted
          loop
          src={getMediaUrl({
            id: backgroundId,
            type: 'video',
          })}
          alt="Banner Video"
        />
      )}
      {(textNode || logoPath) && (
        <div
          data-testid="PageBannerPresentation__foreground"
          className={`flex grow flex-initial items-center text-center px-5 md:px-24 max-w-screen-xl z-10 ${
            variant === 'CENTER' || window.innerWidth < 768
              ? 'flex-col justify-center px-8'
              : 'flex-row justify-start px-5'
          }`}
        >
          {logoPath && (
            <div
              className={`${
                variant === 'CENTER' || window.innerWidth < 768
                  ? 'mb-1'
                  : 'mr-1'
              } hidden md:flex`}
            >
              <img
                className="h-16 w-auto xl:h-28 xl:w-auto rounded-full mx-auto"
                src={logoPath}
                alt={`${site?.title} Logo`}
                loading="lazy"
              />
            </div>
          )}
          {textNode}
        </div>
      )}
    </section>
  )
}
// PROPTYPES
const { node, string, object, oneOf } = PropTypes
PageBannerPresentation.propTypes = {
  backgroundId: string,
  backgroundType: string,
  textNode: node,
  logoPath: string,
  site: object,
  /** Changes layout of component. Variants are: left aligned, center aligned, or search */
  variant: oneOf(['LEFT', 'CENTER']),
}
PageBannerPresentation.defaultProps = {
  variant: 'CENTER',
}

export default PageBannerPresentation
