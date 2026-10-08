import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { FORMAT_LEFT, FORMAT_RIGHT, MEDIUM } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function WidgetLogoPresentation({ widgetData }) {
  const { text } = widgetData?.settings || {}
  const format = widgetData?.format ? widgetData?.format : FORMAT_RIGHT
  return (
    <section id="WidgetLogoPresentation" className="py-6 lg:py-12">
      <div className="bg-blumine-800 py-8 lg:py-0 lg:my-8">
        <div className="px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-6 gap-8">
              {format === FORMAT_LEFT && (
                <div className="flex items-center lg:-my-8 col-span-6 sm:col-span-4 sm:col-start-2 lg:col-span-2 lg:col-start-1">
                  <div className="mx-auto w-sm lg::w-2xl">
                    <SiteLogo.Presentation
                      size={MEDIUM}
                      additionalStyling="shadow-xl"
                    />
                  </div>
                </div>
              )}
              <div className="col-span-6 lg:col-span-4 flex items-center">
                <div className="mx-auto lg:py-6">
                  <p className="my-1 text-white lg:text-lg font-medium  whitespace-pre-line">
                    {text}
                  </p>
                </div>
              </div>
              {format === FORMAT_RIGHT && (
                <div className="flex items-center lg:-my-8 col-span-6 sm:col-span-4 sm:col-start-2 lg:col-span-2 lg:col-start-5">
                  <div className="mx-auto w-sm lg:w-2xl">
                    <SiteLogo.Presentation
                      size={MEDIUM}
                      additionalStyling="shadow-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
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
