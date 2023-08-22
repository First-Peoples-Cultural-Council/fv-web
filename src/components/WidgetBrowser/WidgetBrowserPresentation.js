import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'

function WidgetBrowserPresentation({ site, submitHandler, widgets }) {
  const [selectedWidget, setSelectedWidget] = useState()
  return (
    <div
      id="WidgetBrowserPresentation"
      className="inline-block align-bottom space-y-5 bg-gray-100 border-gray-200 rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle"
    >
      {widgets?.length > 0 ? (
        <>
          <div className="text-center font-medium">
            <h2 className="text-2xl text-fv-charcoal">Available Widgets</h2>
            <p className="text-xl text-fv-charcoal">
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
                    ? 'bg-secondary text-white'
                    : 'hover:bg-gray-50 text-primary bg-white'
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
              type="button"
              disabled={!selectedWidget}
              className="disabled:opacity-40 inline-flex justify-center rounded-lg shadow-lg px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
              onClick={() => submitHandler(selectedWidget)}
            >
              OK
            </button>
            <div className="justify-center text-xl">OR</div>
          </div>
        </>
      ) : (
        <div className="text-center font-medium">
          <p className="text-xl text-fv-charcoal">
            There are no existing Widgets available to add to your page.
          </p>
          <p className="text-xl text-fv-charcoal">
            Would you like to create a new Widget?
          </p>
        </div>
      )}
      <Link
        to={`/${site?.sitename}/dashboard/create/widget`}
        className="inline-flex justify-center items-center rounded-lg shadow-lg px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-light sm:text-sm"
      >
        {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
        <span>Create a New Widget</span>
      </Link>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes

WidgetBrowserPresentation.propTypes = {
  submitHandler: func,
  widgets: array,
  site: object,
}

export default WidgetBrowserPresentation
