import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetBrowserPresentation from 'components/WidgetBrowser/WidgetBrowserPresentation'

function WidgetBrowserContainer({
  chooseWidgetHandler,
  currentWidgets,
  pageSlug,
  widgetsQueryResponse,
}) {
  const widgetsNotOnThisPage = widgetsQueryResponse?.data?.results?.filter(
    (widget) => !currentWidgets?.includes(widget?.id),
  )

  return (
    <WidgetBrowserPresentation
      chooseWidgetHandler={chooseWidgetHandler}
      pageSlug={pageSlug}
      widgets={widgetsNotOnThisPage || []}
    />
  )
}
// PROPTYPES
const { array, func, object, string } = PropTypes
WidgetBrowserContainer.propTypes = {
  chooseWidgetHandler: func,
  currentWidgets: array,
  pageSlug: string,
  widgetsQueryResponse: object,
}

export default WidgetBrowserContainer
