import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAreaEditPresentation from 'components/WidgetAreaEdit/WidgetAreaEditPresentation'
import WidgetAreaEditPresentationSettingsPane from 'components/WidgetAreaEdit/WidgetAreaEditPresentationSettingsPane'
import WidgetAreaEditData from 'components/WidgetAreaEdit/WidgetAreaEditData'
import Loading from 'components/Loading'

function WidgetAreaEditContainer({ widgetAreaId }) {
  const {
    currentWidget,
    setCurrentWidget,
    destination,
    handleRemoveWidget,
    widgetData,
    widgetIds,
    setWidgetIds,
    site,
    isLoading,
    triggerWidgetDataRefresh,
  } = WidgetAreaEditData({
    widgetAreaId,
  })
  return (
    <Loading.Container isLoading={isLoading}>
      <WidgetAreaEditPresentation
        destination={destination}
        widgetData={widgetData}
        widgetIds={widgetIds}
        setWidgetIds={setWidgetIds}
        currentWidget={currentWidget}
        setCurrentWidget={setCurrentWidget}
      >
        <WidgetAreaEditPresentationSettingsPane
          handleRemoveWidget={handleRemoveWidget}
          currentWidget={currentWidget}
          site={site}
          triggerWidgetDataRefresh={triggerWidgetDataRefresh}
        />
      </WidgetAreaEditPresentation>
    </Loading.Container>
  )
}
// PROPTYPES
const { string } = PropTypes
WidgetAreaEditContainer.propTypes = {
  widgetAreaId: string.isRequired,
}

export default WidgetAreaEditContainer
