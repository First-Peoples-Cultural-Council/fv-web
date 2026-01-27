import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { MAX_CATEGORIES } from 'common/constants/limits'
import CategoriesBrowserData from 'components/CategoriesBrowser/CategoriesBrowserData'
import CategoriesBrowserPresentation from 'components/CategoriesBrowser/CategoriesBrowserPresentation'
import useArrayStateManager from 'common/hooks/useArrayStateManager'

function CategoriesBrowserContainer({ chooseDocHandler, formCategories }) {
  const {
    categoriesQueryResponse,
    site,
    sitename,
    filteredCategories,
    setQuery,
  } = CategoriesBrowserData()

  const { selectedItems: selectedCategories, handleSelectAdditionalItem } =
    useArrayStateManager({
      maxItems: MAX_CATEGORIES,
      formItems: formCategories,
    })

  return (
    <CategoriesBrowserPresentation
      categoriesQueryResponse={categoriesQueryResponse}
      site={site}
      sitename={sitename}
      filteredCategories={filteredCategories}
      setQuery={setQuery}
      selectedCategories={selectedCategories}
      handleSelectAdditionalItem={handleSelectAdditionalItem}
      onAddCategories={() => chooseDocHandler(selectedCategories)}
    />
  )
}

// PROPTYPES
const { func, array } = PropTypes
CategoriesBrowserContainer.propTypes = {
  chooseDocHandler: func,
  formCategories: array,
}

export default CategoriesBrowserContainer
