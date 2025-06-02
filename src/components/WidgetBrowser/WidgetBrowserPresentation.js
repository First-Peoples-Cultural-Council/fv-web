import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'

function WidgetBrowserPresentation({ site, chooseWidgetHandler, widgets }) {
  const [selectedWidget, setSelectedWidget] = useState()
  return (
    <div
      id="WidgetBrowserPresentation"
      className="inline-block align-bottom space-y-5 bg-charcoal-50 border-charcoal-100 rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle"
    >
      {widgets?.length > 0 ? (
        <>
          <div className="text-center font-medium">
            <h2 className="text-2xl text-charcoal-900">Available Widgets</h2>
            <p className="text-xl text-charcoal-900">
              Select a Widget to add to your page.
            </p>
          </div>

          <div className="max-w-7xl grid gap-5 grid-cols-4">
            {widgets?.map((widget) => (
              <button
                type="button"
                key={widget?.id}
                onClick={() => setSelectedWidget(widget?.id)}
                className={`${
                  selectedWidget === widget?.id
                    ? 'btn-contained'
                    : 'btn-contained hover:bg-charcoal-50 text-blumine-800 bg-white'
                } col-span-1 w-full p-6 flex items-center align-center justify-center rounded-lg shadow`}
              >
                <div className="space-y-1 truncate">
                  {getWidgetIcon(
                    widget?.type,
                    'w-10 h-10 fill-current inline-flex mx-2',
                  )}
                  <p className="text-lg font-bold">
                    {getWidgetTypeLabel(widget?.type)}
                  </p>
                  <p>Name: {widget?.nickname}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <button
              data-testid="confirm"
              type="button"
              disabled={!selectedWidget}
              className="btn-contained disabled:opacity-40"
              onClick={() => chooseWidgetHandler(selectedWidget)}
            >
              OK
            </button>
            <div className="justify-center text-xl">OR</div>
          </div>
        </>
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
        to={`/${site?.sitename}/dashboard/create/widget`}
        className="btn-contained"
      >
        {getIcon('Add', 'btn-icon')}
        <span>Create a New Widget</span>
      </Link>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes

WidgetBrowserPresentation.propTypes = {
  chooseWidgetHandler: func,
  widgets: array,
  site: object,
}

export default WidgetBrowserPresentation
