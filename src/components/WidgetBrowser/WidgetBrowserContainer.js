import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetBrowserPresentation from 'components/WidgetBrowser/WidgetBrowserPresentation'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetBrowserContainer({
  chooseWidgetHandler,
  currentWidgets,
  pageSlug,
}) {
  const infiniteQueryResponse = useWidgets()
  const widgetsNotOnThisPage =
    infiniteQueryResponse?.data?.pages?.[0]?.results?.filter(
      (widget) => !currentWidgets?.includes(widget?.id),
    )

  return (
    <WidgetBrowserPresentation
      chooseWidgetHandler={chooseWidgetHandler}
      pageSlug={pageSlug}
      widgets={widgetsNotOnThisPage || []}
      infiniteQueryResponse={infiniteQueryResponse}
    />
  )
}
// PROPTYPES
const { array, func, object, string } = PropTypes
WidgetBrowserContainer.propTypes = {
  chooseWidgetHandler: func,
  currentWidgets: array,
  pageSlug: string,
  infiniteQueryResponse: object,
}

export default WidgetBrowserContainer
