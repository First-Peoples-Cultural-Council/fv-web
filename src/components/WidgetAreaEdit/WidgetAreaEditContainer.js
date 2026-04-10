import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAreaEditPresentation from 'components/WidgetAreaEdit/WidgetAreaEditPresentation'
import WidgetAreaEditPresentationSettingsPane from 'components/WidgetAreaEdit/WidgetAreaEditPresentationSettingsPane'
import { useWidgetAreaEdit } from 'common/dataHooks//useWidgetAreaEdit'
import Modal from 'components/Modal'
import WidgetBrowser from 'components/WidgetBrowser'

function WidgetAreaEditContainer({
  pageSlug,
  destinationTitle,
  currentWidgets,
}) {
  const {
    handleAddWidget,
    handleRemoveWidget,
    handleSetWidgetOrder,
    mappedWidgets,
    widgetIds,
  } = useWidgetAreaEdit({ destination: pageSlug, currentWidgets })

  const [currentWidget, setCurrentWidget] = useState()
  const [addModalOpen, setAddModalOpen] = useState(false)

  return (
    <div id="WidgetAreaEditContainer">
      <WidgetAreaEditPresentation
        destinationTitle={destinationTitle}
        currentWidget={currentWidget}
        setCurrentWidget={setCurrentWidget}
        handleSetWidgetOrder={handleSetWidgetOrder}
        setAddModalOpen={setAddModalOpen}
        mappedWidgets={mappedWidgets}
        widgetIds={widgetIds}
      >
        <WidgetAreaEditPresentationSettingsPane
          handleRemoveWidget={() => {
            handleRemoveWidget(currentWidget?.id)
            setCurrentWidget(null)
          }}
          currentWidget={currentWidget}
        />
      </WidgetAreaEditPresentation>
      {/* Add Modal */}
      <Modal.Presentation
        isOpen={addModalOpen}
        closeHandler={() => setAddModalOpen(false)}
      >
        <WidgetBrowser.Container
          chooseWidgetHandler={(id) => {
            handleAddWidget(id)
            setAddModalOpen(false)
          }}
          currentWidgets={widgetIds}
          pageSlug={pageSlug}
        />
      </Modal.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, string } = PropTypes
WidgetAreaEditContainer.propTypes = {
  currentWidgets: array,
  destinationTitle: string,
  pageSlug: string,
}

export default WidgetAreaEditContainer
