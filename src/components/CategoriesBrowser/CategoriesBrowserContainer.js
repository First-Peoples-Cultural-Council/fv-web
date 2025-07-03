import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesBrowserData from 'components/CategoriesBrowser/CategoriesBrowserData'
import CategoriesBrowserPresentation from 'components/CategoriesBrowser/CategoriesBrowserPresentation'
import useArrayStateManager from 'common/hooks/useArrayStateManager'

function CategoriesBrowserContainer({ chooseDocHandler }) {
  const {
    categoriesQueryResponse,
    site,
    sitename,
    filteredCategories,
    setQuery,
  } = CategoriesBrowserData()

  const { selectedItems: selectedCategories, handleSelectAdditionalItem } =
    useArrayStateManager({ maxItems: 8 })

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
const { func } = PropTypes
CategoriesBrowserContainer.propTypes = {
  chooseDocHandler: func,
}

export default CategoriesBrowserContainer
