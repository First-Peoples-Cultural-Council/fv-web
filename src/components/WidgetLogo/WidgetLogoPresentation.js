import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { FORMAT_LEFT, FORMAT_RIGHT, MEDIUM } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function WidgetLogoPresentation({ widgetData }) {
  const { text } = widgetData?.settings || {}
  const format = widgetData?.format ? widgetData?.format : FORMAT_RIGHT
  return (
    <section className="w-full bg-white" data-testid="WidgetLogoPresentation">
      <div className="lg:my-20 py-8 bg-blumine-800 lg:py-0 lg:z-10 lg:relative">
        <div className="mx-auto lg:max-w-7xl lg:px-8 grid grid-cols-3 lg:gap-8">
          {format === FORMAT_LEFT && (
            <div className="relative lg:-my-8 col-span-3 sm:col-span-1 sm:col-start-2 lg:col-start-1">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                <SiteLogo.Presentation
                  size={MEDIUM}
                  additionalStyling="shadow-xl"
                />
              </div>
            </div>
          )}
          <div className="lg:m-0 col-span-3 flex items-center lg:col-span-2 lg:pl-8">
            <div className="mx-auto max-w-md sm:max-w-2xl px-4 sm:px-6 lg:px-0 lg:py-5 lg:max-w-none">
              <p className="my-1 lg:text-lg font-medium text-white whitespace-pre-line">
                {text}
              </p>
            </div>
          </div>
          {format === FORMAT_RIGHT && (
            <div className="relative lg:-my-8 col-span-3 sm:col-span-1 sm:col-start-2 lg:col-start-3">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                <SiteLogo.Presentation
                  size={MEDIUM}
                  additionalStyling="shadow-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { object, shape } = PropTypes
WidgetLogoPresentation.propTypes = {
  widgetData: shape({
    settings: object,
  }),
}

export default WidgetLogoPresentation
