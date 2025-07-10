import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SiteLogo from 'components/SiteLogo'

function PagePresentation({ title, subtitle, hasMedia, showLogo }) {
  const logoTitleColumnStyling =
    'w-20 sm:w-28 md:w-40 flex flex-col items-center justify-center'

  return showLogo ? (
    <div
      data-testid="PageBannerWithLogo"
      className={`flex flex-col items-center justify-center p-3 mx-auto ${hasMedia ? 'text-white md:h-96' : 'text-charcoal-900 py-6'}`}
    >
      <div className={logoTitleColumnStyling}>
        <SiteLogo.Presentation
          additionalStyling={`${logoTitleColumnStyling} z-30 mb-2`}
        />
      </div>
      <div className="flex items-center justify-center text-center w-full max-w-screen-lg">
        <div>
          <h1 className="font-bold text-3xl lg:text-5xl pb-4">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  ) : (
    <div
      data-testid="PageBannerNoLogo"
      className={`flex flex-col items-center justify-center text-center p-3 md:p-5 md:space-x-4 mx-auto max-w-screen-lg ${hasMedia ? 'text-white md:h-96' : 'text-charcoal-900 min-h-52'}`}
    >
      <div>
        <h1 className="font-bold text-3xl lg:text-5xl pb-3">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
PagePresentation.propTypes = {
  title: string,
  subtitle: string,
  hasMedia: bool,
  showLogo: bool,
}

export default PagePresentation
