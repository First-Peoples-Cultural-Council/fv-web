import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetBrowserPresentation from 'components/WidgetBrowser/WidgetBrowserPresentation'
import WidgetBrowserData from 'components/WidgetBrowser/WidgetBrowserData'
import LoadOrError from 'components/LoadOrError'

function WidgetBrowserContainer({
  chooseWidgetHandler,
  currentWidgets,
  pageSlug,
}) {
  const { queryResponse, site, widgets } = WidgetBrowserData({ currentWidgets })
  return (
    <LoadOrError queryResponse={queryResponse}>
      <WidgetBrowserPresentation
        chooseWidgetHandler={chooseWidgetHandler}
        widgets={widgets}
        site={site}
        pageSlug={pageSlug}
      />
    </LoadOrError>
  )
}
// PROPTYPES
const { array, func, string } = PropTypes
WidgetBrowserContainer.propTypes = {
  chooseWidgetHandler: func,
  currentWidgets: array,
  pageSlug: string,
}

export default WidgetBrowserContainer
