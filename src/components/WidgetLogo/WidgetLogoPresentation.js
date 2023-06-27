import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function WidgetLogoPresentation({ widgetData }) {
  const { site } = useSiteStore()
  const { text, uid } = widgetData?.settings || {}
  const format = widgetData?.format ? widgetData?.format : 'right'
  return format === 'right' ? (
    <section className="w-full bg-white" data-testid="WidgetLogoPresentation">
      <div className="my-2 sm:m-10 py-6 sm:py-10 px-2 lg:px-4 bg-tertiaryB sm:rounded-lg">
        <div className="max-w-2xl mx-auto px-4 lg:max-w-7xl border-t border-b border-white">
          <div className="space-y-16 py-4">
            <div
              key={uid}
              className="grid grid-cols-12 lg:gap-x-16 items-center"
            >
              <div className="mt-6 lg:mt-0 col-span-12 lg:col-span-8 xl:col-span-9">
                <p className="mt-2 md:text-lg text-white whitespace-pre-line">
                  {text}
                </p>
              </div>
              <div className="flex-auto col-span-12 sm:col-span-6 sm:col-start-4 lg:col-span-4 xl:col-span-3 order-first lg:order-last">
                <div className="aspect-w-2 aspect-h-2 rounded-full bg-gray-100 overflow-hidden">
                  <img
                    src={site?.logoPathMedium}
                    alt={`${site?.title} Logo`}
                    className="object-center object-cover"
                  />
                </div>
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
              <div className="aspect-w-2 aspect-h-2 rounded-full shadow-xl overflow-hidden">
                <img
                  className="object-cover xl:h-full xl:w-full"
                  src={site?.logoPathMedium}
                  alt={`${site?.title} Logo`}
                />
              </div>
            </div>
          </div>
          <div className="xl:m-0 col-span-3 flex items-center xl:col-span-2 xl:pl-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 xl:px-0 xl:py-5 xl:max-w-none">
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
