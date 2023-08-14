import React from 'react'

// FPCC
import CategoryCrudPresentation from 'components/CategoryCrud/CategoryCrudPresentation'
import CategoryCrudData from 'components/CategoryCrud/CategoryCrudData'
import Loading from 'components/Loading'

function CategoryCrudContainer() {
  const {
    backHandler,
    dataToEdit,
    deleteHandler,
    isLoading,
    submitHandler,
    parentCategoryOptions,
  } = CategoryCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <CategoryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        parentCategoryOptions={parentCategoryOptions}
      />
    </Loading.Container>
  )
}

export default CategoryCrudContainer
