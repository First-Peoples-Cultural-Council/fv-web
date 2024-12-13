import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetBrowserPresentation from 'components/WidgetBrowser/WidgetBrowserPresentation'
import WidgetBrowserData from 'components/WidgetBrowser/WidgetBrowserData'
import LoadOrError from 'components/LoadOrError'

function WidgetBrowserContainer({
  chooseWidgetHandler,
  currentWidgets,
  isHomepage,
}) {
  const { queryResponse, site, widgets } = WidgetBrowserData({
    isHomepage,
    currentWidgets,
  })
  return (
    <LoadOrError queryResponse={queryResponse}>
      <WidgetBrowserPresentation
        chooseWidgetHandler={chooseWidgetHandler}
        widgets={widgets}
        site={site}
      />
    </LoadOrError>
  )
}
// PROPTYPES
const { array, func, bool } = PropTypes
WidgetBrowserContainer.propTypes = {
  chooseWidgetHandler: func,
  isHomepage: bool,
  currentWidgets: array,
}

export default WidgetBrowserContainer
