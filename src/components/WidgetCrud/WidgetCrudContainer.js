import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetCrudPresentation from 'components/WidgetCrud/WidgetCrudPresentation'
import WidgetCrudData from 'components/WidgetCrud/WidgetCrudData'
import Loading from 'components/Loading'

function WidgetCrudContainer({ insertIndex, destinationId }) {
  const { backHandler, dataToEdit, isLoading, submitHandler, widgetTypes } =
    WidgetCrudData({
      insertIndex,
      destinationId,
    })
  return (
    <Loading.Container isLoading={isLoading}>
      <WidgetCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        widgetTypes={widgetTypes}
      />
    </Loading.Container>
  )
}
// PROPTYPES
const { number, string } = PropTypes
WidgetCrudContainer.propTypes = {
  widgetId: string,
  insertIndex: number,
  destinationId: string,
}

export default WidgetCrudContainer
