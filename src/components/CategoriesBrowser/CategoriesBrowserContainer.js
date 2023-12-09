import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesBrowserData from 'components/CategoriesBrowser/CategoriesBrowserData'
import CategoriesBrowserPresentation from 'components/CategoriesBrowser/CategoriesBrowserPresentation'
function CategoriesBrowserContainer({
  chooseDocHandler,
  nameId,
  control,
  append,
  remove,
  fields,
  closeModal,
}) {
  const {
    isLoading,
    site,
    sitename,
    currentCategory,
    setCurrentCategories,
    filteredCategories,
    setQuery,
  } = CategoriesBrowserData()
  return (
    <CategoriesBrowserPresentation
      isLoading={isLoading}
      site={site}
      sitename={sitename}
      chooseDocHandler={chooseDocHandler}
      currentCategory={currentCategory}
      setCurrentCategories={setCurrentCategories}
      filteredCategories={filteredCategories}
      setQuery={setQuery}
      nameId={nameId}
      control={control}
      append={append}
      remove={remove}
      fields={fields}
      closeModal={closeModal}
    />
  )
}

// PROPTYPES
const { func, string, object, array } = PropTypes
CategoriesBrowserContainer.propTypes = {
  chooseDocHandler: func,
  nameId: string,
  control: object,
  append: func,
  remove: func,
  fields: array,
  closeModal: func,
}

export default CategoriesBrowserContainer
