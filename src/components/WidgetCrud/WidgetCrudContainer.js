import React from 'react'

// FPCC
import WidgetCrudPresentation from 'components/WidgetCrud/WidgetCrudPresentation'
import WidgetCrudData from 'components/WidgetCrud/WidgetCrudData'
import Loading from 'components/Loading'

function WidgetCrudContainer() {
  const {
    backHandler,
    dataToEdit,
    isLoading,
    submitHandler,
    deleteHandler,
    widgetTypes,
  } = WidgetCrudData()
  return (
    <Loading.Container isLoading={isLoading}>
      <WidgetCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        widgetTypes={widgetTypes}
      />
    </Loading.Container>
  )
}

export default WidgetCrudContainer
