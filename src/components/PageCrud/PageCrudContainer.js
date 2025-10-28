import React from 'react'
import { useLocation } from 'react-router'

// FPCC
import PageCrudPresentation from 'components/PageCrud/PageCrudPresentation'
import PageCrudData from 'components/PageCrud/PageCrudData'
import PageForm from 'components/PageCrud/PageForm'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function PageCrudContainer() {
  const {
    backHandler,
    isWidgetAreaEdit,
    site,
    submitHandler,
    deleteHandler,
    queryResponse,
  } = PageCrudData()

  const { pathname } = useLocation()
  const isCreate = pathname?.includes('/create/')
  const titleArray = isCreate
    ? ['Create Page']
    : [`Edit ${queryResponse?.data?.title || ''} Page`]
  return (
    <LoadOrError queryResponse={queryResponse} bypass={isCreate}>
      <SiteDocHead titleArray={titleArray} />
      {isWidgetAreaEdit ? (
        <PageCrudPresentation
          dataToEdit={queryResponse?.data}
          site={site}
          queryResponse={queryResponse}
        />
      ) : (
        <PageForm
          cancelHandler={backHandler}
          submitHandler={submitHandler}
          dataToEdit={queryResponse?.data}
          deleteHandler={deleteHandler}
        />
      )}
    </LoadOrError>
  )
}

export default PageCrudContainer
