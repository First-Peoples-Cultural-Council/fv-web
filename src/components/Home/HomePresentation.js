import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import HomeSearchForm from 'components/HomeSearchForm'
import SiteLogo from 'components/SiteLogo'

function HomePresentation({ site }) {
  const logoTitleColumnStyling =
    'w-20 sm:w-28 md:w-40 lg:w-52 flex flex-col items-center justify-center'

  return (
    <div className="flex flex-col items-center justify-center md:h-96 md:flex-row p-3 md:p-5 md:space-x-4 mx-auto">
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
  )
}

// PROPTYPES
const { bool, object } = PropTypes
HomePresentation.propTypes = {
  hasBgMedia: bool,
  site: object,
}

export default HomePresentation
