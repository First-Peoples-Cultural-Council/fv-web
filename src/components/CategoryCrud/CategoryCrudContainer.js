import React from 'react'

// FPCC
import CategoryCrudPresentation from 'components/CategoryCrud/CategoryCrudPresentation'
import CategoryCrudData from 'components/CategoryCrud/CategoryCrudData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function CategoryCrudContainer() {
  const {
    backHandler,
    dataToEdit,
    deleteHandler,
    categoriesQueryResponse,
    submitHandler,
    parentCategoryOptions,
  } = CategoryCrudData()

  const isCreate = !(
    dataToEdit &&
    (dataToEdit.id || dataToEdit.uuid || dataToEdit.title || dataToEdit.name)
  )
  const action = isCreate ? 'Create' : 'Edit'
  const entryLabel = dataToEdit?.title || dataToEdit?.name

  return (
    <LoadOrError queryResponse={categoriesQueryResponse}>
      <SiteDocHead
        titleArray={[
          `${action} Category`,
          !isCreate ? entryLabel : null,
        ].filter(Boolean)}
      />
      <CategoryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        parentCategoryOptions={parentCategoryOptions}
      />
    </LoadOrError>
  )
}

export default CategoryCrudContainer
