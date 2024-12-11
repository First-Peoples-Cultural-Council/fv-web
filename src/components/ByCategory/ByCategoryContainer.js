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
    categoriesQueryResponse,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType,
    entryLabel,
    searchInfiniteQueryResponse,
    moreActions,
    selectedTab,
    sitename,
    tabs,
  } = ByCategoryData({ kids })
  return (
    <LoadOrError queryResponse={categoriesQueryResponse}>
      <SiteDocHead titleArray={[currentCategory?.title, 'Category']} />
      <ByCategoryPresentation
        actions={actions}
        categories={categoriesQueryResponse?.data?.results || []}
        currentCategory={currentCategory}
        currentParentCategory={currentParentCategory}
        searchInfiniteQueryResponse={searchInfiniteQueryResponse}
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
