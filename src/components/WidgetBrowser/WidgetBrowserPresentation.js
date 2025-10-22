import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'

function WidgetBrowserPresentation({ chooseWidgetHandler, pageSlug, widgets }) {
  const [selectedWidget, setSelectedWidget] = useState()
  return (
    <div
      id="WidgetBrowserPresentation"
      className="inline-block align-bottom bg-charcoal-50 border-charcoal-100 rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle"
    >
      {widgets?.length > 0 ? (
        <div className="space-y-5">
          <div className="text-center font-medium">
            <h2 className="text-2xl text-charcoal-900">Available Widgets</h2>
            <p className="text-xl text-charcoal-900">
              Select a Widget to add to your page.
            </p>
          </div>

          <div className="max-w-4xl grid gap-3 grid-cols-4">
            {widgets?.map((widget) => (
              <button
                data-testid="selectWidgetBtn"
                type="button"
                key={widget?.id}
                onClick={() => setSelectedWidget(widget?.id)}
                className={`${
                  selectedWidget === widget?.id
                    ? 'btn-primary'
                    : 'btn-secondary'
                } col-span-1 w-full h-24 p-3 flex items-center align-center justify-center shadow`}
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center justify-center space-x-2">
                    {getWidgetIcon(
                      widget?.type,
                      'w-6 h-6 fill-current inline-flex',
                    )}
                    <span className="text-lg font-bold">
                      {getWidgetTypeLabel(widget?.type)}
                    </span>
                  </div>
                  <p className="text-wrap">{widget?.nickname}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <button
              data-testid="confirm"
              type="button"
              disabled={!selectedWidget}
              className="btn-primary btn-md"
              onClick={() => chooseWidgetHandler(selectedWidget)}
            >
              OK
            </button>
            <div className="justify-center text-xl">OR</div>
          </div>
        </div>
      ) : (
        <div className="text-center font-medium">
          <p className="text-xl text-charcoal-900">
            There are no existing Widgets available to add to your page.
          </p>
          <p className="text-xl text-charcoal-900">
            Would you like to create a new Widget?
          </p>
        </div>
      )}
      <Link
        to={`/${widgets?.[0]?.sitename}/dashboard/create/widget?destination=${pageSlug || 'isHomePage'}`}
        className="btn-primary btn-md mt-3"
      >
        {getIcon('Add')}
        <span>Create a New Widget</span>
      </Link>
    </div>
  )
}

// PROPTYPES
const { array, func, string } = PropTypes

WidgetBrowserPresentation.propTypes = {
  chooseWidgetHandler: func,
  pageSlug: string,
  widgets: array,
}

export default WidgetBrowserPresentation
