import React from 'react'
import { useLocation } from 'react-router'

// FPCC
import WidgetCrudPresentation from 'components/WidgetCrud/WidgetCrudPresentation'
import WidgetCrudData from 'components/WidgetCrud/WidgetCrudData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function WidgetCrudContainer() {
  const {
    backHandler,
    queryResponse,
    submitHandler,
    deleteHandler,
    widgetTypes,
  } = WidgetCrudData()

  const { pathname } = useLocation()
  const isCreate = pathname?.includes('/create/')
  const titleArray = isCreate
    ? ['Create Widget']
    : ['Edit Widget', queryResponse?.data?.nickname || null]

  return (
    <LoadOrError queryResponse={queryResponse} bypass={isCreate}>
      <SiteDocHead titleArray={titleArray} />
      <WidgetCrudPresentation
        backHandler={backHandler}
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        widgetTypes={widgetTypes}
      />
    </LoadOrError>
  )
}

export default WidgetCrudContainer
