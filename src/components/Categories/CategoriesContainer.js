import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesPresentation from 'components/Categories/CategoriesPresentation'
import CategoriesData from 'components/Categories/CategoriesData'
import Loading from 'components/Loading'

function CategoriesContainer({ kids }) {
  const {
    categories,
    searchType,
    setSearchTypeInUrl,
    entryLabelPlural,
    isLoading,
    sitename,
  } = CategoriesData()
  return (
    <Loading.Container isLoading={isLoading}>
      <CategoriesPresentation
        categories={categories}
        searchType={searchType}
        setSearchType={setSearchTypeInUrl}
        entryLabelPlural={entryLabelPlural}
        kids={kids}
        sitename={sitename}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool } = PropTypes
CategoriesContainer.propTypes = {
  kids: bool,
}

CategoriesContainer.defaultProps = {
  kids: false,
}

export default CategoriesContainer
