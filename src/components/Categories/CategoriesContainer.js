import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesPresentation from 'components/Categories/CategoriesPresentation'
import CategoriesData from 'components/Categories/CategoriesData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function CategoriesContainer({ kids = null }) {
  const { categories, isLoading, sitename } = CategoriesData()
  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead titleArray={['Categories']} />
      <CategoriesPresentation
        categories={categories}
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

export default CategoriesContainer
