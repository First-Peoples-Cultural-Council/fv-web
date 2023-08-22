import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAreaEditPresentation from 'components/WidgetAreaEdit/WidgetAreaEditPresentation'
import WidgetAreaEditPresentationSettingsPane from 'components/WidgetAreaEdit/WidgetAreaEditPresentationSettingsPane'
import WidgetAreaEditData from 'components/WidgetAreaEdit/WidgetAreaEditData'
import Loading from 'components/Loading'

function WidgetAreaEditContainer({ pageSlug, home = false }) {
  const {
    currentWidget,
    setCurrentWidget,
    destinationTitle,
    handleAddWidget,
    handleRemoveWidget,
    widgetData,
    widgetIds,
    setWidgetIds,
    site,
    isLoading,
  } = WidgetAreaEditData({
    pageSlug,
    home,
  })
  return (
    <Loading.Container isLoading={isLoading}>
      <WidgetAreaEditPresentation
        destinationTitle={destinationTitle}
        widgetData={widgetData}
        widgetIds={widgetIds}
        setWidgetIds={setWidgetIds}
        currentWidget={currentWidget}
        setCurrentWidget={setCurrentWidget}
        handleAddWidget={handleAddWidget}
      >
        <WidgetAreaEditPresentationSettingsPane
          handleRemoveWidget={handleRemoveWidget}
          currentWidget={currentWidget}
          site={site}
        />
      </WidgetAreaEditPresentation>
    </Loading.Container>
  )
}
// PROPTYPES
const { bool, string } = PropTypes
WidgetAreaEditContainer.propTypes = {
  pageSlug: string.isRequired,
  home: bool,
}

export default WidgetAreaEditContainer
