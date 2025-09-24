import React from 'react'

// FPCC
import WidgetCrudPresentation from 'components/WidgetCrud/WidgetCrudPresentation'
import WidgetCrudData from 'components/WidgetCrud/WidgetCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function WidgetCrudContainer() {
  const {
    backHandler,
    dataToEdit,
    isLoading,
    submitHandler,
    deleteHandler,
    widgetTypes,
  } = WidgetCrudData()

  const isEdit = Boolean(
    dataToEdit &&
      (dataToEdit.id || dataToEdit.uuid || dataToEdit.title || dataToEdit.name),
  )

  const action = isEdit ? 'Edit' : 'Create'
  const entryLabel = isEdit ? dataToEdit?.title || dataToEdit?.name : null

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead
        titleArray={[`${action} Widget`, isEdit ? entryLabel : null].filter(
          Boolean,
        )}
      />
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
