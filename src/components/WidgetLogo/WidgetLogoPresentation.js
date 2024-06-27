import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { FORMAT_RIGHT, MEDIUM } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function WidgetLogoPresentation({ widgetData }) {
  const { text, id } = widgetData?.settings || {}
  const format = widgetData?.format ? widgetData?.format : FORMAT_RIGHT
  return format === FORMAT_RIGHT ? (
    <section className="w-full bg-white" data-testid="WidgetLogoPresentation">
      <div className="my-2 sm:m-10 py-6 sm:py-10 px-2 lg:px-4 bg-tertiaryB sm:rounded-lg">
        <div className="max-w-2xl mx-auto px-4 lg:max-w-7xl border-t border-b border-white">
          <div className="space-y-16 py-4">
            <div
              key={id}
              className="grid grid-cols-12 lg:gap-x-16 items-center"
            >
              <div className="mt-6 lg:mt-0 col-span-12 lg:col-span-8 xl:col-span-9">
                <p className="mt-2 md:text-lg text-white whitespace-pre-line">
                  {text}
                </p>
              </div>
              <div className="flex-auto col-span-12 px-10 sm:px-0 sm:col-span-6 sm:col-start-4 lg:col-span-4 xl:col-span-3 order-first lg:order-last">
                <SiteLogo.Presentation size={MEDIUM} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="w-full bg-white" data-testid="WidgetLogoPresentation">
      <div className="xl:my-20 py-8 bg-primary xl:py-0 xl:z-10 xl:relative">
        <div className="mx-auto xl:max-w-7xl xl:px-8 grid grid-cols-3 xl:gap-8">
          <div className="relative xl:-my-8 col-span-3 sm:col-span-1 sm:col-start-2 xl:col-start-1">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 xl:p-0 xl:h-full">
              <SiteLogo.Presentation
                size={MEDIUM}
                additionalStyling="shadow-xl"
              />
            </div>
          </div>
          <div className="xl:m-0 col-span-3 flex items-center xl:col-span-2 xl:pl-8">
            <div className="mx-auto max-w-md sm:max-w-2xl px-4 sm:px-6 xl:px-0 xl:py-5 xl:max-w-none">
              <p className="my-1 lg:text-lg font-medium text-white whitespace-pre-line">
                {text}
              </p>
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
