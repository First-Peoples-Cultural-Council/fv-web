import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAddToDocPresentation from 'components/WidgetAddToDoc/WidgetAddToDocPresentation'
import WidgetAddToDocData from 'components/WidgetAddToDoc/WidgetAddToDocData'

function WidgetAddToDocContainer({ closeHandler, insertIndex, destinationId }) {
  const { isLoading, site, submitHandler, widgets } = WidgetAddToDocData({ closeHandler, insertIndex, destinationId })
  return (
    <WidgetAddToDocPresentation
      closeHandler={closeHandler}
      submitHandler={submitHandler}
      widgets={widgets}
      insertIndex={insertIndex}
      destinationId={destinationId}
      isLoading={isLoading}
      site={site}
    />
  )
}
// PROPTYPES
const { func, number, string } = PropTypes
WidgetAddToDocContainer.propTypes = {
  closeHandler: func,
  insertIndex: number,
  destinationId: string,
}

export default WidgetAddToDocContainer
