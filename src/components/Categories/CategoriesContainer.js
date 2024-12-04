import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import CategoriesPresentation from 'components/Categories/CategoriesPresentation'
import CategoriesData from 'components/Categories/CategoriesData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function CategoriesContainer({ kids = null }) {
  const { categoryQueryReturn, sitename } = CategoriesData()
  return (
    <LoadOrError queryReturn={categoryQueryReturn}>
      <SiteDocHead titleArray={['Categories']} />
      <CategoriesPresentation
        categories={categoryQueryReturn?.data?.results}
        kids={kids}
        sitename={sitename}
      />
    </LoadOrError>
  )
}

// PROPTYPES
const { bool } = PropTypes
CategoriesContainer.propTypes = {
  kids: bool,
}

export default CategoriesContainer
