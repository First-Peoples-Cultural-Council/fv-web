import React from 'react'

// FPCC
import CategoryCrudPresentation from 'components/CategoryCrud/CategoryCrudPresentation'
import CategoryCrudData from 'components/CategoryCrud/CategoryCrudData'
import LoadOrError from 'components/LoadOrError'

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
