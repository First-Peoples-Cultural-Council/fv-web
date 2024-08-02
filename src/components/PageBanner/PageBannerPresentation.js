import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, VIDEO, ORIGINAL } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function PageBannerPresentation({
  background,
  backgroundType,
  textNode,
  showLogo,
  variant = 'CENTER',
}) {
  if (!background && !textNode && !showLogo) {
    return null
  }

  const containerStyles =
    backgroundType === IMAGE
      ? {
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0.47)), url(${getMediaPath(
            {
              mediaObject: background,
              type: IMAGE,
              size: ORIGINAL,
            },
          )})`,
        }
      : {}

  function getConditionalClass() {
    switch (backgroundType) {
      case IMAGE:
        return 'text-white bg-no-repeat bg-cover bg-center py-6 md:py-16'
      case VIDEO:
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
      {backgroundType === VIDEO && (
        <video
          className="absolute z-10 w-auto h-auto min-w-full min-h-full max-w-none"
          autoPlay
          muted
          loop
          src={getMediaPath({
            mediaObject: background,
            type: VIDEO,
            size: ORIGINAL,
          })}
          alt={background?.title}
        />
      )}
      {(textNode || showLogo) && (
        <div
          data-testid="PageBannerPresentation__foreground"
          className={`flex grow flex-initial items-center text-center px-5 md:px-24 max-w-screen-xl z-10 ${
            variant === 'CENTER' || window.innerWidth < 768
              ? 'flex-col justify-center px-8'
              : 'flex-row justify-start px-5'
          }`}
        >
          {showLogo && (
            <div
              className={`${
                variant === 'CENTER' || window.innerWidth < 768
                  ? 'mb-1'
                  : 'mr-1'
              } hidden md:flex`}
            >
              <SiteLogo.Presentation additionalStyling="w-24 md:w-32 lg:w-44" />
            </div>
          )}
          {textNode}
        </div>
      )}
    </section>
  )
}
// PROPTYPES
const { bool, node, string, object, oneOf } = PropTypes
PageBannerPresentation.propTypes = {
  background: object,
  backgroundType: string,
  textNode: node,
  showLogo: bool,
  /** Changes layout of component. Variants are: left aligned, center aligned, or search */
  variant: oneOf(['LEFT', 'CENTER']),
}

export default PageBannerPresentation
