import React from 'react'
import { useLocation } from 'react-router'

// FPCC
import OrganizationCrudPresentation from 'components/OrganizationCrud/OrganizationCrudPresentation'
import OrganizationCrudData from 'components/OrganizationCrud/OrganizationCrudData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function OrganizationCrudContainer() {
  const { backHandler, queryResponse, submitHandler, deleteHandler } =
    OrganizationCrudData()

  const { pathname } = useLocation()
  const isCreate = pathname?.includes('/create/')

  const action = isCreate ? 'Create' : 'Edit'
  const organizationName = isCreate ? null : queryResponse?.data?.name

  return (
    <LoadOrError queryResponse={queryResponse} bypass={isCreate}>
      <SiteDocHead
        titleArray={[`${action} Organization`, organizationName].filter(
          Boolean,
        )}
      />
      <OrganizationCrudPresentation
        backHandler={backHandler}
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
      />
    </LoadOrError>
  )
}

export default OrganizationCrudContainer
