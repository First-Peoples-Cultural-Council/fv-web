import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByCategoryPresentation from 'components/ByCategory/ByCategoryPresentation'
import ByCategoryData from 'components/ByCategory/ByCategoryData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'
function ByCategoryContainer({ kids = null }) {
  const {
    actions,
    categoriesQueryReturn,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType,
    entryLabel,
    searchQueryReturn,
    moreActions,
    selectedTab,
    sitename,
    tabs,
  } = ByCategoryData({ kids })
  return (
    <LoadOrError queryReturn={categoriesQueryReturn}>
      <SiteDocHead titleArray={[currentCategory?.title, 'Category']} />
      <ByCategoryPresentation
        actions={actions}
        categories={categoriesQueryReturn?.data?.results || []}
        currentCategory={currentCategory}
        currentParentCategory={currentParentCategory}
        searchQueryReturn={searchQueryReturn}
        searchType={searchType}
        setSearchType={setSearchType}
        entryLabel={entryLabel}
        kids={kids}
        moreActions={moreActions}
        selectedTab={selectedTab}
        sitename={sitename}
        tabs={tabs}
      />
    </LoadOrError>
  )
}

// PROPTYPES
const { bool } = PropTypes
ByCategoryContainer.propTypes = {
  kids: bool,
}

export default ByCategoryContainer
