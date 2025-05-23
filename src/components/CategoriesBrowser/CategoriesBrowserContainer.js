import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesBrowserData from 'components/CategoriesBrowser/CategoriesBrowserData'
import CategoriesBrowserPresentation from 'components/CategoriesBrowser/CategoriesBrowserPresentation'
function CategoriesBrowserContainer({ chooseDocHandler }) {
  const {
    categoriesQueryResponse,
    site,
    sitename,
    currentCategory,
    setCurrentCategory,
    filteredCategories,
    setQuery,
  } = CategoriesBrowserData()
  return (
    <CategoriesBrowserPresentation
      categoriesQueryResponse={categoriesQueryResponse}
      site={site}
      sitename={sitename}
      chooseDocHandler={chooseDocHandler}
      currentCategory={currentCategory}
      setCurrentCategory={setCurrentCategory}
      filteredCategories={filteredCategories}
      setQuery={setQuery}
    />
  )
}

// PROPTYPES
const { func } = PropTypes
CategoriesBrowserContainer.propTypes = {
  chooseDocHandler: func,
}

export default CategoriesBrowserContainer
