import React from 'react'

// FPCC
import CategoryCrudPresentation from 'components/CategoryCrud/CategoryCrudPresentation'
import CategoryCrudData from 'components/CategoryCrud/CategoryCrudData'
import Loading from 'components/Loading'

function CategoryCrudContainer() {
  const {
    backHandler,
    categoriesDirectoryId,
    phrasebooksDirectoryId,
    dataToEdit,
    isLoading,
    submitHandler,
    parentCategories,
  } = CategoryCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <CategoryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        categoriesDirectoryId={categoriesDirectoryId}
        parentCategories={parentCategories}
        phrasebooksDirectoryId={phrasebooksDirectoryId}
      />
    </Loading.Container>
  )
}

export default CategoryCrudContainer
