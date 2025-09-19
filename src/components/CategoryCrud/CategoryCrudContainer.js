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

  return (
    <LoadOrError queryResponse={categoriesQueryResponse}>
      <SiteDocHead titleArray={['Create Category']} />
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
