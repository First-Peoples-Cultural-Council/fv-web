import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetBrowserPresentation from 'components/WidgetBrowser/WidgetBrowserPresentation'
import WidgetBrowserData from 'components/WidgetBrowser/WidgetBrowserData'
import Loading from 'components/Loading'

function WidgetBrowserContainer({
  chooseWidgetHandler,
  currentWidgets,
  isHomepage,
}) {
  const { isLoading, site, widgets } = WidgetBrowserData({
    isHomepage,
    currentWidgets,
  })
  return (
    <Loading.Container isLoading={isLoading}>
      <WidgetBrowserPresentation
        chooseWidgetHandler={chooseWidgetHandler}
        widgets={widgets}
        site={site}
      />
    </Loading.Container>
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
